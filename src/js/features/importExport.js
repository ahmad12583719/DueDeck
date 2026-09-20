export const parseImport = (text) => {
  const value = JSON.parse(text);
  if (!Array.isArray(value) && !Array.isArray(value?.tasks))
    throw new Error("Invalid task export");
  return value;
};
export const exportData = (tasks, settings, notifications) =>
  JSON.stringify(
    {
      version: 1,
      exportedAt: new Date().toISOString(),
      tasks,
      settings,
      notifications,
    },
    null,
    2,
  );
