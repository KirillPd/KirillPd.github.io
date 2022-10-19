import { calculateRandomOffset } from './calculateRandomOffset';

describe('calculateRandomOffset', () => {
  it('should return random number in between', () => {
    const max = 100;
    const min = 0;
    const result = calculateRandomOffset(min, max);

    expect(result).toBeLessThanOrEqual(max);
    expect(result).toBeGreaterThanOrEqual(min);
  });

  it('should return `min` when `max` and `min` are equal', () => {
    const max = 100;
    const min = 100;
    const result = calculateRandomOffset(min, max);

    expect(result).toBe(min);
  });

  it('should return `0` when `min` is less than `max', () => {
    const max = 0;
    const min = 100;
    const result = calculateRandomOffset(min, max);

    expect(result).toBe(0);
  });
});
