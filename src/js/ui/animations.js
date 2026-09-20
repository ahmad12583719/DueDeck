export const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const animate = (element, className, callback, duration = 260) => {
  if (!element || reducedMotion()) {
    callback();
    return;
  }
  element.classList.add(className);
  setTimeout(callback, duration);
};

export const removeTaskWithAnimation = (card, remove) =>
  animate(card, "task-card-removing", remove);

export const animateView = (root, direction) => {
  if (reducedMotion()) return;
  root.classList.remove("view-switching", "view-switching-reverse");
  void root.offsetWidth;
  root.classList.add(
    direction === "reverse" ? "view-switching-reverse" : "view-switching",
  );
};

export const animateCalendar = (root, direction) => {
  if (reducedMotion() || !direction) return;
  root.classList.remove("calendar-switching", "calendar-switching-reverse");
  void root.offsetWidth;
  root.classList.add(
    direction === "reverse"
      ? "calendar-switching-reverse"
      : "calendar-switching",
  );
};
