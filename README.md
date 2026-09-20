# DueDeck Task Manager

## 1. Overview

DueDeck is a dependency-free task manager for keeping deadlines, notes, subtasks, and recurring work in one place. It is built with native ES modules, works without a build step, and uses the exact tagline: **Your deadlines, all in one deck.**

## 2. Features

- Create, edit, complete, delete, reorder, and clear tasks.
- Set deadlines, priorities, tags, colors, descriptions, images, subtasks, and daily/weekly/monthly recurrence.
- Search and filter by status, deadline, or tag; sort by deadline, priority, or creation date.
- Review a month calendar and a today-only completion summary.
- Receive due, 10-minute, and one-hour notifications with snooze and reschedule actions.
- Import and export a complete JSON backup.
- Use automatic, light, or dark themes; all task data remains in the browser.

## 3. Run locally

No packages or build tools are required. From the repository directory, start any static HTTP server. Python is available on most development machines:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000> in a current browser. Serving the files over HTTP is required for ES modules, service workers, and notification behavior. Stop the server with `Ctrl+C`.

## 4. Bookmark the app

While DueDeck is open at `http://localhost:8000`, press `Ctrl+D` (Windows/Linux) or `Command+D` (macOS), edit the bookmark name if desired, and save it. For a deployed copy, bookmark its GitHub Pages URL instead. A bookmark to a local server works only while that server is running.

## 5. Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Open the repository and choose **Settings**.
3. Select **Pages** under **Code and automation**.
4. Set **Source** to **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)`, then select **Save**.
6. Wait for GitHub to publish the site, then open the URL shown under **Settings → Pages**.

The app has no build command, so the repository root can be published directly. If the repository is renamed, keep the relative script, stylesheet, and `duedeck-sw.js` paths intact.

## 6. Clone

```bash
git clone https://github.com/ahmad12583719/DueDeck.git
cd DueDeck
```

## 7. Project tree

```text
DueDeck/
├── index.html                 # Application shell and task dialog
├── duedeck-sw.js              # Notification click handler
├── LICENSE
├── README.md
├── src/
│   ├── assets/icons/          # Static icon assets
│   ├── css/                   # Base, layout, component, and theme styles
│   └── js/
│       ├── core/              # State, storage, and events
│       ├── features/          # Search, calendar, notifications, themes, import/export
│       ├── models/            # Task, tag, subtask, and recurrence models
│       ├── ui/                # List, calendar, progress, and drag/drop rendering
│       └── main.js            # Application wiring and event listeners
└── .gitignore
```

## 8. Data and privacy

Tasks are stored locally under versioned `duedeck.v1`, `duedeck.settings.v1`, and `duedeck.notifications.v1` keys. DueDeck does not send task content to a server. Export a JSON backup before clearing browser data or changing profiles.

## 9. Browser support

Use a current browser with ES modules, `localStorage`, `<dialog>`, drag-and-drop, service workers, and the Notification API. Notifications are delivered while the page is open; the scheduler checks on load and periodically while open.

## 10. License

MIT. See [`LICENSE`](LICENSE).
