const arraySum = (array: number[]) =>
  array.reduce((sum: number, element: number) => sum + element, 0);

const round = (value: number, digitsAfterPoint: number = 2) =>
  value.toFixed(digitsAfterPoint);

export { round, arraySum };
