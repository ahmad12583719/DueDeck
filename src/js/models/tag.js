export const normalizeTags = (v) => [
  ...new Set(
    (Array.isArray(v) ? v : String(v || "").split(","))
      .map((x) => x.trim().toLowerCase())
      .filter(Boolean),
  ),
];
