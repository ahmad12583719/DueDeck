export const nextOccurrence = (date, rule) => {
  if (!date || !rule) return date;
  const d = new Date(date);
  if (rule === "daily") d.setDate(d.getDate() + 1);
  if (rule === "weekly") d.setDate(d.getDate() + 7);
  if (rule === "monthly") d.setMonth(d.getMonth() + 1);
  return d.toISOString();
};
