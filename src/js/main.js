import { store } from "./core/state.js";
import { storage } from "./core/storage.js";
import { events } from "./core/events.js";
import { renderList } from "./ui/renderList.js";
import { renderCalendar } from "./ui/renderCalendar.js";
import { renderProgress } from "./ui/progress.js";
import { fillForm } from "./ui/renderTaskDetail.js";
import { filteredTasks } from "./features/search.js";
import { resolvedTheme } from "./features/theme.js";
import { parseImport, exportData } from "./features/importExport.js";
import { enableDragDrop } from "./ui/dragdrop.js";
import {
  notificationCandidates,
  requestNotifications,
  markNotified,
  snoozeTask,
  showNotification,
  registerNotificationWorker,
} from "./features/notifications.js";
import { nextOccurrence } from "./models/recurrence.js";
import { imageDataUrl } from "./features/richText.js";

// Constants and state
const download = (name, text) => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type: "application/json" }));
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 0);
};
const $ = (s) => document.querySelector(s),
  dialog = $("#task-dialog");
let permissionAsked = false;

// Helpers
const toast = (m) => {
  const x = $("#toast");
  x.textContent = m;
  x.classList.add("show");
  setTimeout(() => x.classList.remove("show"), 2200);
};
const askPermission = () => {
  if (
    !permissionAsked &&
    "Notification" in window &&
    Notification.permission === "default"
  ) {
    permissionAsked = true;
    requestNotifications();
  }
};
function tags() {
  const all = [...new Set(store.get().tasks.flatMap((t) => t.tags || []))];
  $("#tag-filters").innerHTML =
    '<button class="tag-filter active" data-tag="all">All tags</button>' +
    all
      .map((t) => {
        const owner = store.get().tasks.find((x) => (x.tags || []).includes(t));
        return `<button class="tag-filter" data-tag="${t}" style="--tag-color:${owner?.color || "#5b62a8"}">#${t}</button>`;
      })
      .join("");
}
function render() {
  const s = store.get(),
    list = filteredTasks(s.tasks, s.filters, s.sort);
  document.documentElement.dataset.theme = resolvedTheme(s.theme);
  renderProgress(s.tasks);
  tags();
  if (s.view === "calendar")
    renderCalendar($("#app-view"), s.tasks, s.calendarDate, (d) =>
      store.setCalendarDate(d),
    );
  else {
    renderList($("#app-view"), list);
    enableDragDrop($("#app-view"), (from, to) => store.reorder(from, to));
  }
  $("#view-title").textContent =
    s.view === "calendar" ? "Calendar" : "My tasks";
  $("#view-subtitle").textContent =
    s.view === "calendar"
      ? `${s.tasks.length} scheduled task${s.tasks.length !== 1 ? "s" : ""}`
      : `${list.length} task${list.length !== 1 ? "s" : ""} · ${s.tasks.filter((t) => t.status === "done").length} completed`;
  document
    .querySelectorAll(".nav")
    .forEach((x) => x.classList.toggle("active", x.dataset.view === s.view));
  $("#sort").disabled = s.view === "calendar";
}
function openTask(t) {
  fillForm(t);
  $("#task-image-file").value = "";
  dialog.showModal();
}
function showNotice(task, kind) {
  const box = document.createElement("div");
  box.className = "notification";
  box.innerHTML = `<strong>${kind === "due" ? "Due now" : `Due in ${kind === "hour" ? "1 hour" : "10 minutes"}`}</strong><div>${task.title}</div><button data-notify='snooze'>Snooze 10 min</button><button data-notify='reschedule'>Reschedule</button>`;
  box.addEventListener("click", (e) => {
    const action = e.target.dataset.notify;
    if (action === "snooze") {
      store.update(task.id, { deadline: snoozeTask(task) });
      box.remove();
      toast("Snoozed for 10 minutes");
    }
    if (action === "reschedule") {
      const value = prompt(
        "New deadline (for example 2026-09-20T18:30)",
        task.deadline?.slice(0, 16),
      );
      if (value) {
        store.update(task.id, { deadline: new Date(value).toISOString() });
        box.remove();
        toast("Deadline rescheduled");
      }
    }
  });
  document.body.append(box);
}
function notify() {
  if (!("Notification" in window) || Notification.permission !== "granted")
    return;
  notificationCandidates(store.get().tasks).forEach(({ task, kind }) => {
    markNotified(task.id, kind);
    showNotification(
      kind === "due"
        ? "Task due now"
        : `Task due in ${kind === "hour" ? "1 hour" : "10 minutes"}`,
      task,
      kind,
    ).then((n) => {
      if (n)
        n.onclick = () => {
          window.focus();
          showNotice(task, kind);
        };
    });
    showNotice(task, kind);
  });
}
function cycleTheme() {
  const v = store.get().theme;
  store.setTheme(v === "auto" ? "light" : v === "light" ? "dark" : "auto");
  toast(`Theme: ${store.get().theme}`);
}

// Event listeners
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-action]");
  if (a) {
    const id = a.dataset.id,
      act = a.dataset.action;
    askPermission();
    if (act === "new-task") openTask();
    if (act === "edit") openTask(store.get().tasks.find((t) => t.id === id));
    if (act === "delete" && confirm("Delete this task?")) store.remove(id);
    if (act === "toggle") {
      const t = store.get().tasks.find((t) => t.id === id);
      if (t?.recurrence && t.status !== "done")
        store.update(id, {
          status: "todo",
          deadline: nextOccurrence(t.deadline, t.recurrence),
        });
      else store.toggle(id);
    }
    if (act === "subtask-toggle") {
      const t = store.get().tasks.find((t) => t.id === id),
        subs = t?.subtasks.map((x) =>
          x.id === a.dataset.subtask ? { ...x, done: !x.done } : x,
        );
      if (t) store.update(id, { subtasks: subs });
    }
    if (act === "edit-subtask") {
      const t = store.get().tasks.find((t) => t.id === id),
        sub = t?.subtasks.find((x) => x.id === a.dataset.subtask),
        title = prompt("Subtask title", sub?.title);
      if (t && title?.trim())
        store.update(id, {
          subtasks: t.subtasks.map((x) =>
            x.id === a.dataset.subtask ? { ...x, title: title.trim() } : x,
          ),
        });
    }
    if (act === "toggle-theme") cycleTheme();
    if (act === "export")
      download(
        "duedeck-tasks.json",
        exportData(
          store.get().tasks,
          { theme: store.get().theme },
          storage.loadNotifications(),
        ),
      );
    if (act === "clear-completed") {
      store
        .get()
        .tasks.filter((t) => t.status === "done")
        .forEach((t) => store.remove(t.id));
      toast("Completed tasks cleared");
    }
  }
  if (e.target.matches("[data-view]")) store.setView(e.target.dataset.view);
  if (e.target.matches("[data-tag]"))
    store.setFilter("tag", e.target.dataset.tag);
});
const saveTask = async () => {
  const id = $("#task-id").value;
  let description = $("#task-description").value;
  const url = $("#task-image-url").value.trim();
  if (url) description += `\n${url}`;
  const file = $("#task-image-file").files[0];
  if (file) description += `\n${await imageDataUrl(file)}`;
  const old = id && store.get().tasks.find((t) => t.id === id);
  const rawSubs = $("#task-subtasks")
    .value.split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  const d = {
    title: $("#task-title").value.trim(),
    description,
    deadline: $("#task-deadline").value
      ? new Date($("#task-deadline").value).toISOString()
      : "",
    priority: $("#task-priority").value,
    tags: $("#task-tags").value,
    color: $("#task-color").value,
    recurrence: $("#task-recurrence").value,
    subtasks: rawSubs.map((title, i) => ({
      id: old?.subtasks[i]?.id || `subtask-${Date.now()}-${i}`,
      title,
      done: old?.subtasks[i]?.done || false,
    })),
  };
  id ? store.update(id, d) : store.add(d);
  dialog.close();
  toast("Task saved");
};
$("#task-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if ($("#task-form").reportValidity()) saveTask();
});
document
  .querySelectorAll("[data-dialog-cancel]")
  .forEach((button) => button.addEventListener("click", () => dialog.close()));
if ("serviceWorker" in navigator) {
  registerNotificationWorker();
  navigator.serviceWorker.addEventListener("message", (e) => {
    const { type, action, taskId } = e.data || {};
    if (type !== "notification-action") return;
    const task = store.get().tasks.find((t) => t.id === taskId);
    if (!task) return;
    if (action === "snooze") {
      store.update(task.id, { deadline: snoozeTask(task) });
      toast("Snoozed for 10 minutes");
    } else if (action === "reschedule") {
      const value = prompt(
        "New deadline (for example 2026-09-20T18:30)",
        task.deadline?.slice(0, 16),
      );
      if (value)
        store.update(task.id, { deadline: new Date(value).toISOString() });
    }
  });
}
$("#search").addEventListener("input", (e) =>
  store.setFilter("query", e.target.value),
);
$("#status-filter").addEventListener("change", (e) =>
  store.setFilter("status", e.target.value),
);
$("#deadline-filter").addEventListener("change", (e) =>
  store.setFilter("deadline", e.target.value),
);
$("#sort").addEventListener("change", (e) => store.setSort(e.target.value));
$("#import-file").addEventListener("change", (e) => {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      store.import(parseImport(r.result));
      toast("Imported successfully");
    } catch {
      toast("Invalid JSON export");
    }
  };
  r.readAsText(f);
  e.target.value = "";
});
events.on("change", render);
render();
setInterval(notify, 30000);
notify();
