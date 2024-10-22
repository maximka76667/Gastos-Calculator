const arraySum = (array: string[]) =>
  array.reduce(
    (sum: number, element: string) => sum + (parseFloat(element) || 0),
    0
  );

export { arraySum };
