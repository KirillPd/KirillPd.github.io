export const calculateRandomOffset = (min: number, max: number) => {
  if (min === max) {
    return min;
  }

  if (min > max) {
    return 0;
  }

  return Math.random() * (max - min) + min;
};
