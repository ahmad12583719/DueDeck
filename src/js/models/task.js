import { normalizeTags } from "./tag.js";
const uid = () =>
  globalThis.crypto?.randomUUID?.() ||
  `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
export const createTask = (data = {}) => ({
  id: data.id || uid(),
  title: String(data.title || "Untitled task").trim(),
  description: data.description || "",
  status: ["todo", "doing", "done"].includes(data.status)
    ? data.status
    : "todo",
  priority: ["low", "medium", "high"].includes(data.priority)
    ? data.priority
    : "medium",
  deadline: data.deadline || "",
  tags: normalizeTags(data.tags),
  tagColors: data.tagColors || {},
  color: data.color || "#5b62a8",
  subtasks: Array.isArray(data.subtasks)
    ? data.subtasks.map((x) =>
        typeof x === "string"
          ? { id: uid(), title: x, done: false }
          : { id: x.id || uid(), title: x.title || "", done: !!x.done },
      )
    : [],
  recurrence: ["daily", "weekly", "monthly"].includes(data.recurrence)
    ? data.recurrence
    : null,
  createdAt: data.createdAt || new Date().toISOString(),
  order: data.order ?? Date.now(),
});
export const isDone = (t) => t.status === "done";
