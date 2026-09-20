import { monthDays, tasksOnDate } from "../features/calendar.js";
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export const renderCalendar = (root, tasks, date, onMonth) => {
  const d = new Date(date),
    { offset, days } = monthDays(d.getFullYear(), d.getMonth()),
    names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let body = "";
  for (let i = 0; i < offset + days; i++) {
    if (i < offset) {
      body += '<div class="cal-cell muted"></div>';
      continue;
    }
    const day = i - offset + 1,
      dt = new Date(d.getFullYear(), d.getMonth(), day),
      ts = tasksOnDate(tasks, dt),
      today = dt.toDateString() === new Date().toDateString();
    body += `<div class="cal-cell ${today ? "today" : ""}"><div class="cal-date">${day}</div>${ts.map((t) => `<div class="cal-task" style="background:${esc(t.color)}" title="${esc(t.description || t.title)}">${esc(t.title)}</div>`).join("")}</div>`;
  }
  root.innerHTML = `<div class="calendar"><div class="calendar-toolbar"><button data-calendar="prev">‹</button><strong>${d.toLocaleString([], { month: "long", year: "numeric" })}</strong><button data-calendar="next">›</button><button data-calendar="today">Today</button></div><div class="cal-head">${names.map((x) => `<div>${x}</div>`).join("")}</div><div class="cal-grid">${body}</div></div>`;
  root.querySelectorAll("[data-calendar]").forEach(
    (b) =>
      (b.onclick = () => {
        const next = new Date(d);
        if (b.dataset.calendar === "prev") next.setMonth(next.getMonth() - 1);
        if (b.dataset.calendar === "next") next.setMonth(next.getMonth() + 1);
        if (b.dataset.calendar === "today") return onMonth(new Date());
        onMonth(next);
      }),
  );
};
