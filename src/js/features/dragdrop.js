export const reorderIds = (items, from, to) => {
  const ids = items.map((x) => x.id),
    a = ids.indexOf(from),
    b = ids.indexOf(to);
  if (a < 0 || b < 0) return ids;
  ids.splice(b, 0, ids.splice(a, 1)[0]);
  return ids;
};
