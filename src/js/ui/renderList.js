import { formatDescription } from "../features/richText.js";
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export const renderList = (root, tasks) => {
  root.innerHTML = tasks.length
    ? `<div class="task-list">${tasks
        .map((t) => {
          const subDone = t.subtasks.filter((x) => x.done).length;
          return `<article class="task-card${t.status === "done" ? " is-completed" : ""}" draggable="true" data-id="${t.id}" style="--task-color:${esc(t.color)}"><div class="task-card__checkbox"><input class="task-check" type="checkbox" data-action="toggle" data-id="${t.id}" ${t.status === "done" ? "checked" : ""}></div><div class="task-card__content"><div class="task-card__title task-title">${esc(t.title)}</div><div class="task-meta">${t.deadline ? `<span>Due ${new Date(t.deadline).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</span>` : ""}<span class="chip">${esc(t.priority)}</span>${t.recurrence ? `<span class="chip">${t.recurrence}</span>` : ""}${t.tags.map((x) => `<span class="chip" style="background:${esc(t.color)}22;color:${esc(t.color)}">#${esc(x)}</span>`).join("")}</div>${t.description ? `<p class="description">${formatDescription(t.description)}</p>` : ""}${t.subtasks.length ? `<div class="subtasks"><div class="progress"><i style="width:${(subDone / t.subtasks.length) * 100}%"></i></div>${t.subtasks.map((x) => `<label class="subtask"><input type="checkbox" data-action="subtask-toggle" data-id="${t.id}" data-subtask="${x.id}" ${x.done ? "checked" : ""}><span>${esc(x.title)}</span><button data-action="edit-subtask" data-id="${t.id}" data-subtask="${x.id}" title="Edit subtask">Edit</button></label>`).join("")}<small>${subDone}/${t.subtasks.length} subtasks</small></div>` : ""}</div><div class="task-card__actions task-menu"><button data-action="edit" data-id="${t.id}" title="Edit">Edit</button><button data-action="delete" data-id="${t.id}" title="Delete">Delete</button></div></article>`;
        })
        .join("")}</div>`
    : '<div class="empty"><h3>No tasks here</h3><p>Create a task or adjust your filters.</p></div>';
};
