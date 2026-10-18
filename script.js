// 1. Select the HTML elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categoryInput = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// 2. Store notes in memory
const notes = [];

// 3. Display the correct note count
function updateNoteCount() {
  const total = notes.length;

  if (total === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (total === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${total} notes.`;
  }
}

// 4. Render the notes
function render() {
  notesList.replaceChildren();

  notes.forEach((note) => {
    const listItem = document.createElement("li");

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const category = document.createElement("span");
    category.className =
      `note-category category-${note.category.toLowerCase()}`;
    category.textContent = note.category;

    const metadata = document.createElement("div");
    metadata.className = "note-meta";
    metadata.append(category);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      deleteNote(note.id);
    });

    listItem.append(text, metadata, deleteButton);
    notesList.append(listItem);
  });

  updateNoteCount();
}

// 5. Delete a note by its ID
function deleteNote(id) {
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    render();
  }
}

// 6. Validate and add a note
noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = categoryInput.value;

  if (!text) {
    errorMessage.textContent = "Please enter a note before submitting.";
    noteInput.focus();
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent =
      "Your note must be 200 characters or fewer.";
    noteInput.focus();
    return;
  }

  errorMessage.textContent = "";

  const note = {
    id: crypto.randomUUID(),
    text,
    category,
    createdAt: new Date().toISOString(),
  };

  notes.push(note);
  render();

  noteForm.reset();
  noteInput.focus();
});

// 7. Clear validation errors as the user types
noteInput.addEventListener("input", () => {
  errorMessage.textContent = "";
});

// 8. Show the initial state
updateNoteCount();
