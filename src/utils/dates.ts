export const getLastWeekDate = () => {
  const today = new Date();
  const startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  return startDate;
};
