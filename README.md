# FocusFlow Task Manager

FocusFlow is a dependency-free, responsive task manager built with native ES modules. It keeps task data private in versioned browser storage and works without a build step.

## Features

- Task CRUD, completion, delete, smooth card animation, and drag-and-drop ordering
- Deadlines, daily/weekly/monthly recurrence, and a month calendar with navigation
- Search, status/deadline/tag filters, tag color coding, and priority sorting
- Rich descriptions with safe links, image URLs, and local image uploads (base64)
- Editable/toggleable subtasks and a today-only progress summary
- Notification permission on first use, 1-hour/10-minute/due alerts, snooze and reschedule actions
- Full JSON import/export (tasks, settings, and notification state)
- Auto, light, and dark theme overrides; responsive list/calendar UI

## Getting started

No dependencies or build tools are required. Serve the directory with any static HTTP server (recommended for module and Notification API behavior), then open `index.html`.

```bash
python3 -m http.server 8000 --directory task-manager
```

Open <http://localhost:8000>.

## Data and privacy

All data is stored locally in versioned keys (`focusflow.v1`, settings, and notification state). Export a JSON backup before clearing browser data. The app does not send task content to a server.

## GitHub Pages

1. Push the repository to GitHub.
2. Open the repository and select **Settings**.
3. In the sidebar select **Pages** (under **Code and automation**).
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then click **Save**.
6. Wait for the deployment check, then open the published URL shown in **Settings → Pages**.

## Project structure

- `src/js/models/` contains pure task, tag, subtask, and recurrence models.
- `src/js/core/` owns state, versioned storage, and the pub/sub event bus.
- `src/js/features/` contains feature logic (search, calendar, notifications, themes, import/export, and rich text).
- `src/js/ui/` owns DOM rendering and interaction binding.
- `src/js/main.js` wires state, features, and UI together.

## Browser support

Use a current browser with ES modules, `localStorage`, `<dialog>`, drag-and-drop, and the Notification API. Notifications are delivered while the page is open; the scheduler checks on page load and periodically while open.

## License

MIT. See `LICENSE`.
