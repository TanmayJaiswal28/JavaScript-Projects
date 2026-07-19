# TaskFlow – Simple Browser‑Based To‑Do App

**One‑sentence value proposition** – Manage tasks, set priorities and due dates, and track progress directly in the browser without any server.

## Overview
The `JavaScript-Projects` repository contains a small multi‑page task manager called **TaskFlow**. The core functionality lives in the `Javascript projects/to-do-app/` folder:

- `app.html`               Main task‑management interface  
- `scripts.js`             Logic for adding, completing, deleting, and persisting tasks  
- `styles.css`             Styling and simple animations  
- Additional pages (`homepage.html`, `careers.html`, `index.html`, `landing.html`) provide navigation and placeholder content.

## Features (verified from source)
- **Task creation** with description, priority selector (low / medium / high) and optional due date.  
- **Live statistics** showing total tasks, completed tasks, and a progress bar that reflects completion percentage.  
- **Task list** rendered dynamically with entry/exit animations.  
- **Mark as complete** and **delete** actions, each with visual feedback (checkbox animation, shake effect on delete).  
- **LocalStorage persistence** – tasks survive page reloads.  
- Simple navigation between Home, Careers, Sign‑Up and App pages.

## Tech Stack
- **HTML5** – page structure and navigation.  
- **CSS3** – custom styles defined in `styles.css` (no external frameworks).  
- **Vanilla JavaScript (ES6)** – class‑based implementation, DOM manipulation, and `localStorage` usage.

## Getting Started
1. Clone the repository.  
2. Open `Javascript projects/to-do-app/app.html` in a web browser (e.g., Chrome, Firefox).  
3. Interact with the app: add tasks, set priorities and due dates, mark tasks as complete, or delete them. The statistics update automatically.

## Limitations
- This is a learning prototype; it does **not** include user authentication, server‑side storage, or advanced error handling.  
- The UI is static and intended for demonstration purposes only.  

## Contributing
Contributions are welcome. Feel free to improve the UI, add new features (e.g., categories, export/import), or refactor the code. When submitting a pull request, include a brief description of the changes made.
