export const createSubtask = (title = "") => ({
  id: globalThis.crypto?.randomUUID?.() || `sub-${Date.now()}`,
  title: String(title).trim(),
  done: false,
});
