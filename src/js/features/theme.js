export const resolvedTheme = (theme) =>
  theme === "auto"
    ? matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    : theme;
