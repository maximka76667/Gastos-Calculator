import React, { useEffect, useState } from "react";
import styles from "./App.module.css";

interface Person {
  name: string;
  days: number;
  gastos: number;
}

function App() {
  const [total, setTotal] = useState<number>(0);
  const [daysTotal, setDaysTotal] = useState<number>(0);

  const [persons, setPersons] = useState<Person[]>([
    { name: "Max", days: 30, gastos: 0 },
    { name: "Olesia", days: 30, gastos: 0 },
    { name: "Angels", days: 30, gastos: 0 },
    { name: "Mariola", days: 30, gastos: 0 },
  ]);

  useEffect(() => {
    setPersons((prev) =>
      prev.map((person) => ({
        ...person,
        gastos: (person.days / daysTotal) * total,
      }))
    );
  }, [total, daysTotal]);

  useEffect(() => {
    setDaysTotal(persons.reduce((prev, person) => prev + person.days, 0));
  }, [persons]);

  return (
    <div className={styles.app}>
      <div className={styles["persons"]}>
        {persons.map(({ name, days }, index) => {
          return (
            <div className={styles["person"]}>
              <input
                className={styles["person__name-input"]}
                type="text"
                placeholder="Insert new person"
                onChange={(e) => {
                  setPersons((prev) =>
                    prev.map((person, i) =>
                      i === index
                        ? {
                            ...person,
                            name: e.target.value,
                          }
                        : person
                    )
                  );
                }}
                value={name}
              />
              <input
                className={styles["person__days-input"]}
                type="number"
                name={`days${index}`}
                id={`days${index}`}
                placeholder={`Days ${index}`}
                onChange={(e) => {
                  setPersons((prev) =>
                    prev.map((person, i) =>
                      i === index
                        ? {
                            ...person,
                            days: parseInt(e.target.value) || (0 as number),
                          }
                        : person
                    )
                  );
                }}
                value={days}
              />
            </div>
          );
        })}
      </div>

      <button
        onClick={() =>
          setPersons((prev) => [...prev, { name: "", days: 30, gastos: 0 }])
        }
      >
        Add
      </button>
      <input
        type="number"
        name="total"
        id="total"
        placeholder="Total"
        onChange={(e) => setTotal(parseFloat(e.target.value) || (0 as number))}
      />
      {persons.map(({ name, days, gastos }) => (
        <p>
          {name} ({days}/{daysTotal}): {gastos.toFixed(2)}
        </p>
      ))}
    </div>
  );
}

export default App;
