# DueDeck

**Your deadlines, all in one deck.**

DueDeck is a private, offline-first task manager for organizing deadlines, recurring work, notes, images, subtasks, and calendar planning in one responsive browser app. It uses native ES modules and browser storage, so there is no framework, build step, or external service.

Built by Muhammad Ahmad Raza.

## Features

- Create, edit, complete, delete, clear, and drag-and-drop reorder tasks.
- Persist tasks, settings, notification state, tags, and subtasks in versioned `localStorage`.
- Seed three example tasks on the first load when no saved data exists.
- Set deadlines with one-hour, ten-minute, and due-time browser notifications.
- Snooze a notification for ten minutes or reschedule its deadline.
- Switch between a focused list view and a wider month calendar.
- Navigate calendar months and preview deadline tasks on calendar cells.
- Add descriptions, image URLs, and local images stored as base64 data.
- Add, complete, and edit subtasks/checklists inside task cards.
- Repeat tasks daily, weekly, or monthly.
- Add color-coded tags and filter by tag.
- Search by task text, descriptions, or tags.
- Filter by status and overdue, today, or this-week deadlines.
- Review a today-only completion progress summary.
- Export and import complete task data as JSON.
- Use automatic, light, or dark themes with a manual override.
- Work responsively from 360px mobile layouts through wide calendar screens.

## Screenshots

![DueDeck screenshot](./docs/screenshot.png)

Add a screenshot to `docs/screenshot.png` when one is available.

## Tech stack

- Vanilla HTML
- CSS
- JavaScript with native ES modules
- Browser APIs: `localStorage`, `Notification`, `FileReader`, service workers, and drag-and-drop

There are no frameworks, external CDNs, runtime dependencies, or build steps.

## Project structure

```text
DueDeck/
├── index.html                 # Semantic application shell and task dialog
├── duedeck-sw.js              # Notification action service worker
├── README.md                 # Project documentation
├── LICENSE                   # MIT license
├── .gitignore                # Local and generated files to ignore
├── src/
│   ├── assets/icons/          # Reserved static icon directory
│   ├── css/
│   │   ├── base.css           # Reset, typography, shared component primitives
│   │   ├── themes.css         # Light, dark, and system color tokens
│   │   ├── layout.css         # Responsive page layout
│   │   └── components.css     # Tasks, calendar, modal, and control styling
│   └── js/
│       ├── main.js            # Application entry point and event wiring
│       ├── core/              # State, versioned storage, and pub/sub events
│       ├── models/            # Pure task, tag, subtask, and recurrence models
│       ├── features/          # Search, calendar, notifications, themes, and data features
│       └── ui/                # DOM rendering and drag-and-drop bindings
└── docs/                      # Optional screenshots for documentation
```

## Getting started

### Prerequisites

1. A current Chrome, Edge, Firefox, or Safari browser.
2. Git.
3. Either VS Code with the Live Server extension or Node.js.

### Clone the repository

```bash
git clone https://github.com/MuhammadAhmadRaza/due-deck.git
cd due-deck
```

### Run it locally

ES modules and service workers do not work reliably when `index.html` is opened directly through `file://`. Use a local HTTP server.

**Option A — VS Code Live Server**

1. Open the project folder in VS Code.
2. Right-click `index.html`.
3. Choose **Open with Live Server**.
4. Open the local URL shown by VS Code.

**Option B — Node.js**

```bash
npx serve
```

Open the local URL printed by `npx serve`.

### First-time setup in the app

1. Open DueDeck through the local server.
2. Allow notifications when the browser asks. This is needed for deadline reminders.
3. Confirm that three example tasks appear on the first load.
4. Export a backup before clearing browser data or changing browser profiles.

## Using DueDeck

1. **Add a task and deadline:** choose **New task**, enter a title, select a date and time, and save.
2. **Add details:** enter a description, paste an image URL, or select a local image file. Add comma-separated subtasks and tags.
3. **Switch views:** use **List** for focused work or **Calendar** to review scheduled tasks by month.
4. **Repeat a task:** choose daily, weekly, or monthly recurrence in the task dialog.
5. **Search and filter:** use the search field, status filter, deadline filter, and tag buttons.
6. **Reorder tasks:** drag a task card over another task card in list view.
7. **Back up data:** choose **Export** to download JSON, or **Import** to restore a JSON backup.
8. **Change appearance:** use the theme control to cycle between light, dark, and automatic system themes.

## Bookmarking it for daily use

1. **Chrome / Edge:** open the live URL, click the star in the address bar, name it **DueDeck**, choose **Bookmarks Bar**, and click **Save**.
2. **Firefox:** open the live URL, click the star, name it **DueDeck**, choose **Toolbar**, and click **Save**.
3. **Safari:** open the live URL, press `Cmd + D`, name it **DueDeck**, choose **Favorites**, and click **Add**.
4. If needed, open the browser's bookmark manager and move DueDeck to the bookmarks bar.
5. For automatic access, set the live URL as the browser homepage, add it as a pinned tab, or configure it to open at startup.

## Deploying to GitHub Pages

1. Push your latest changes to the `main` branch.
2. Open the repository on GitHub and choose **Settings**.
3. Select **Pages** under **Code and automation**.
4. Under **Source**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then choose **Save**.
6. Wait about one minute for the deployment.
7. Open `https://ahmad12583719.github.io/due-deck/`.

## Roadmap

- Optional task sharing and collaboration.
- More flexible recurring schedules and custom notification times.
- Keyboard shortcuts and richer calendar interactions.
- Optional encrypted export files.

## License

MIT, © 2026 Muhammad Ahmad Raza. See [`LICENSE`](LICENSE).
