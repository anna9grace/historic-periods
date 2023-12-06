export const getInitialPosition = (
  index: number,
  length: number,
  radius: number
) => {
  return `rotate(calc(${index}*360deg/${length})) translateX(${radius}px) rotate(calc(-1*calc(${index}*360deg/${length})`;
};
