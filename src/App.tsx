import React, { useCallback, useEffect, useState } from "react";
import styles from "./App.module.css";
import Cookies from "js-cookie";
import { arraySum } from "./utils";
import { PersonInterface } from "./types";
import Person from "./components/Person/Person";
import Plus2 from "./assets/images/Vector Line Scribbles (Community)/Plus 02.svg";

function App() {
  const [total, setTotal] = useState<number | "">(0);
  const [daysTotal, setDaysTotal] = useState<number>(0);
  const [extraTotal, setExtraTotal] = useState<number>(0);

  const [persons, setPersons] = useState<PersonInterface[]>([]);

  const [isInitialized, setIsInitialized] = useState(false); // New flag

  const calculateGastos = useCallback(
    (person: PersonInterface) => {
      // Electricy, water and etc bills part in relation to days
      const gasto = ((person.days || 0) / daysTotal) * (total || 0);

      // All persons expenses
      const arrayOfExtrasValues = person.extras.map(
        (extra) => Object.values(extra)[0]
      );

      const personsExtras = arraySum(arrayOfExtrasValues);

      // How much this person debts to others
      const personsDebt = extraTotal / Math.max(1, persons.length);

      return gasto + personsDebt - personsExtras;
    },
    [extraTotal, daysTotal, total, persons.length]
  );

  useEffect(() => {
    setPersons((prev) =>
      prev.map((person) => {
        return {
          ...person,
          gastos: calculateGastos(person),
        };
      })
    );
  }, [total, daysTotal, extraTotal, calculateGastos]);

  useEffect(() => {
    const cookiesPersons = Cookies.get("persons");
    const cookiesTotal = Cookies.get("total");

    if (cookiesPersons) setPersons(JSON.parse(cookiesPersons));
    if (cookiesTotal) setTotal(JSON.parse(cookiesTotal));

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // If app already loaded
    // recalculate total days and total extras on every persons array change
    if (isInitialized) {
      // Go through all persons and calculate
      // 1. sum of days
      // 2. sum of extra expenses
      const { newDaysTotal, newExtraExpensesTotal } = persons.reduce(
        (totals, person) => {
          const days = totals.newDaysTotal + (person.days || 0);

          const arrayOfExtrasValues = person.extras.map(
            (extra) => Object.values(extra)[0]
          );

          const extraExpenses =
            totals.newExtraExpensesTotal + arraySum(arrayOfExtrasValues);

          return {
            newDaysTotal: days,
            newExtraExpensesTotal: extraExpenses,
          };
        },
        { newDaysTotal: 0, newExtraExpensesTotal: 0 }
      );

      setDaysTotal(newDaysTotal);
      setExtraTotal(newExtraExpensesTotal);

      Cookies.set("persons", JSON.stringify(persons), {
        path: "/Gastos-Calculator",
      });
    }
  }, [persons, isInitialized]);

  useEffect(() => {
    // If app already loaded - save total bills to cookies
    if (isInitialized) {
      Cookies.set("total", JSON.stringify(total), {
        path: "/Gastos-Calculator",
      });
    }
  }, [total, isInitialized]);

  return (
    <div className={styles.app}>
      <div className={styles["persons"]}>
        <input
          className={styles["persons__total"]}
          type="number"
          name="total"
          id="total"
          placeholder="Total"
          value={total}
          onChange={(e) => {
            setTotal(parseFloat(e.target.value) || "");
          }}
        />
        <div className={styles["persons__list"]}>
          {persons.map((person, index) => {
            return (
              <Person
                key={index}
                id={index}
                person={person}
                setPersons={setPersons}
              />
            );
          })}
        </div>
        <button
          className={styles["persons_add-button"]}
          onClick={() =>
            setPersons((prev) => [
              ...prev,
              { name: "", days: 30, gastos: 0, extras: [] },
            ])
          }
        >
          <img src={Plus2} alt="Divider line" />
        </button>
      </div>
    </div>
  );
}

export default App;
