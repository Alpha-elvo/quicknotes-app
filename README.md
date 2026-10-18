
# QuickNotes

A lightweight, responsive note-taking application built with HTML, CSS, and vanilla JavaScript.

QuickNotes lets users create categorized notes, search their notes instantly, and keep their notes saved between browser sessions using localStorage.

## Features

- Create notes in Personal, Work, and Study categories.
- Validate note input and enforce a 200-character limit.
- Delete individual notes.
- Search notes by text as you type.
- Automatically save and restore notes using browser localStorage.
- Display an accurate total note count.
- Use a responsive interface on desktop and mobile devices.

## Technologies

- HTML5 for semantic page structure.
- CSS3 for styling, responsive layouts, and category badges.
- Vanilla JavaScript for application logic and DOM manipulation.
- Browser localStorage for client-side persistence.
- Git and GitHub for version control.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-GITHUB-USERNAME/quicknotes-app.git
   ```

2. Enter the project directory:

   ```bash
   cd quicknotes-app
   ```

3. Open `index.html` in a browser.

No package installation or build step is required.

## How to Use

1. Enter a note in the input field.
2. Select Personal, Work, or Study.
3. Select **Add Note**.
4. Search for notes using the search field.
5. Select **Delete** to remove a note.

Notes are stored in the browser's localStorage. They are not automatically synchronized between browsers or devices.

## Project Structure

```text
quicknotes-app/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Input Rules

- Notes cannot be empty or contain only whitespace.
- Each note is limited to 200 characters.

## Limitations

- Notes are stored locally in the browser.
- There is no account system or cloud synchronization.
- Clearing the browser's site data may delete saved notes.

## Future Improvements

- Edit existing notes.
- Filter notes by category.
- Add a clear-all option with confirmation.
- Export and import notes.
- Add automated tests.

## License

This project was created for learning and educational purposes.

