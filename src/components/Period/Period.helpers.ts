export const getNewYear = (currentYear: number, newYear: number) => {
  if (currentYear === newYear) return newYear;

  const isFuture = newYear > currentYear;

  return isFuture ? currentYear + 1 : currentYear - 1;
};

export const getPeriodsGap = (currentYears: number[], newYears: number[]) =>
  Math.max(
    Math.abs(newYears[0] - currentYears[0]),
    Math.abs(newYears[1] - currentYears[1])
  );

export const UPDATE_INTERVAL = 50;
