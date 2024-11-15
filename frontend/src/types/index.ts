interface PersonInterface {
  name: string;
  days: number | "";
  gastos: number;
  extras: { [key: string]: number }[];
}

export type { PersonInterface };
