const arraySum = (array: string[]) =>
  array.reduce(
    (sum: number, element: string) => sum + (parseFloat(element) || 0),
    0
  );

const roundUp = (value: number, digitsAfterPoint: number = 2) =>
  value.toFixed(digitsAfterPoint);

export { roundUp, arraySum };
