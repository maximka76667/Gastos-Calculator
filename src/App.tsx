import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import Cookies from "js-cookie";
import { arraySum } from "./utils";
import { PersonInterface } from "./types";
import Person from "./components/Person/Person";

function App() {
  const [total, setTotal] = useState<number | "">(0);
  const [daysTotal, setDaysTotal] = useState<number>(0);
  const [extraTotal, setExtraTotal] = useState<number>(0);

  const [persons, setPersons] = useState<PersonInterface[]>([]);

  const [isInitialized, setIsInitialized] = useState(false); // New flag

  function calculateGastos(person: PersonInterface) {
    // Electricy, water and etc bills part in relation to days
    const gasto = ((person.days || 0) / daysTotal) * (total || 0);

    // All persons expenses
    const personsExtras = arraySum(person.extras);

    // How much this person debts to others
    const personsDebt =
      (extraTotal - personsExtras) / Math.max(1, persons.length - 1);

    return gasto + personsDebt - personsExtras;
  }

  useEffect(() => {
    setPersons((prev) =>
      prev.map((person) => {
        return {
          ...person,
          gastos: calculateGastos(person),
        };
      })
    );
  }, [total, daysTotal, extraTotal]);

  useEffect(() => {
    const cookiesPersons = Cookies.get("persons");
    if (cookiesPersons) {
      setPersons(JSON.parse(cookiesPersons));
    }

    const cookiesTotal = Cookies.get("total");
    if (cookiesTotal) {
      setTotal(JSON.parse(cookiesTotal));
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // If app already loaded
    // recalculate total days and total extras on every persons array change
    if (isInitialized) {
      setDaysTotal(
        persons.reduce((prev, person) => prev + (person.days || 0), 0)
      );
      setExtraTotal(
        persons.reduce((sum, person) => sum + arraySum(person.extras), 0)
      );
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
        <p>Total extra:{extraTotal}</p>
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
          Add person
        </button>
      </div>
    </div>
  );
}

export default App;
