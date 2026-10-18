
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categoryInput = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

const STORAGE_KEY = "quicknotes-notes";

// Load previously saved notes, if available.
function loadNotes() {
  try {
    const savedNotes = localStorage.getItem(STORAGE_KEY);

    if (!savedNotes) return [];

    const parsedNotes = JSON.parse(savedNotes);

    if (!Array.isArray(parsedNotes)) return [];

    return parsedNotes.filter((note) =>
      note &&
      typeof note.id === "string" &&
      typeof note.text === "string" &&
      ["Personal", "Work", "Study"].includes(note.category) &&
      typeof note.createdAt === "string"
    );
  } catch (error) {
    console.error("Could not load saved notes:", error);
    return [];
  }
}

let notes = loadNotes();

// Save the current notes to browser storage.
function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Could not save notes:", error);
    errorMessage.textContent =
      "Could not save notes. Check your browser storage.";
  }
}

// Display the correct note count.
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

// Render notes, applying the current search query.
function render() {
  notesList.replaceChildren();

  const query = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(query)
  );

  filteredNotes.forEach((note) => {
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

    const date = document.createElement("time");
    date.dateTime = note.createdAt;

    const parsedDate = new Date(note.createdAt);
    date.textContent = Number.isNaN(parsedDate.getTime())
      ? "Saved note"
      : parsedDate.toLocaleString();

    metadata.append(category, date);

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

  if (query && filteredNotes.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.textContent = "No notes match your search.";
    notesList.append(emptyMessage);
  }
}

// Delete a note and persist the change.
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// Validate and add a note.
noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = categoryInput.value;

  if (!text) {
    errorMessage.textContent =
      "Please enter a note before submitting.";
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

  notes.push({
    id: crypto.randomUUID(),
    text,
    category,
    createdAt: new Date().toISOString(),
  });

  saveNotes();
  render();

  noteForm.reset();
  noteInput.focus();
});

// Clear the validation message as the user types.
noteInput.addEventListener("input", () => {
  errorMessage.textContent = "";
});

// Search notes as the user types.
searchInput.addEventListener("input", render);

// Show saved notes on page load.
render();

