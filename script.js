// 1. Select the HTML elements we need
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categoryInput = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

// 2. Store notes in memory
const notes = [];

// 3. Display notes on the page
function render() {
  notesList.replaceChildren();

  notes.forEach((note) => {
    // Create the note card
    const listItem = document.createElement("li");

    // Create the note text
    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    // Create the category badge
    const category = document.createElement("span");
    category.className =
      `note-category category-${note.category.toLowerCase()}`;
    category.textContent = note.category;

    // Create the metadata container
    const metadata = document.createElement("div");
    metadata.className = "note-meta";
    metadata.append(category);

    // Add everything to the card
    listItem.append(text, metadata);
    notesList.append(listItem);
  });
}

// 4. Handle the form submission
noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = categoryInput.value;

  // Ignore empty submissions for now
  if (!text) {
    return;
  }

  // Create and store a note object
  const note = {
    id: crypto.randomUUID(),
    text: text,
    category: category,
    createdAt: new Date().toISOString(),
  };

  notes.push(note);

  // Refresh the interface
  render();

  // Clear the input for the next note
  noteForm.reset();
  noteInput.focus();
});
