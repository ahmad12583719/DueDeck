import { isDone } from "../models/task.js";
import { todayTasks } from "../features/search.js";
export const renderProgress = (tasks) => {
  const today = todayTasks(tasks),
    done = today.filter(isDone).length,
    p = today.length ? Math.round((done / today.length) * 100) : 0;
  const ring = document.querySelector("#progress-ring");
  if (ring) ring.style.setProperty("--progress", p + "%");
  document.querySelector("#progress-value").textContent = p + "%";
  document.querySelector("#progress-count").textContent =
    `${done} of ${today.length} complete`;
};
