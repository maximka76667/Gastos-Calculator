import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import Cookies from "js-cookie";

interface Person {
  name: string;
  days: number;
  gastos: number;
}

function App() {
  const [total, setTotal] = useState<number>(0);
  const [daysTotal, setDaysTotal] = useState<number>(0);

  const [persons, setPersons] = useState<Person[]>([]);

  const [isInitialized, setIsInitialized] = useState(false); // New flag

  useEffect(() => {
    setPersons((prev) =>
      prev.map((person) => ({
        ...person,
        gastos: (person.days / daysTotal) * total,
      }))
    );
  }, [total, daysTotal]);

  useEffect(() => {
    const cookiesPersons = Cookies.get("persons");

    console.log(cookiesPersons);

    if (cookiesPersons) {
      setPersons(JSON.parse(cookiesPersons));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      setDaysTotal(persons.reduce((prev, person) => prev + person.days, 0));
      Cookies.set("persons", JSON.stringify(persons), {
        path: "/Gastos-Calculator",
      });
      console.log(JSON.stringify(persons));
    }
  }, [persons, isInitialized]);

  return (
    <div className={styles.app}>
      <div className={styles["persons"]}>
        <input
          className={styles["persons__total"]}
          type="number"
          name="total"
          id="total"
          placeholder="Total"
          onChange={(e) =>
            setTotal(parseFloat(e.target.value) || (0 as number))
          }
        />
        <div className={styles["persons__list"]}>
          {persons.map(({ name, days, gastos }, index) => {
            return (
              <div key={index} className={styles["person"]}>
                <div
                  className={styles["person__remove"]}
                  onClick={() => {
                    setPersons((prev) => prev.filter((_, i) => i !== index));
                  }}
                >
                  X
                </div>
                <div className={styles["person__name"]}>
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
                </div>
                <div className={styles["person__info"]}>
                  <div className={styles["person__days"]}>
                    <input
                      className={styles["person__days-input"]}
                      type="text"
                      name={`days${index}`}
                      id={`days${index}`}
                      placeholder={`Days ${index}`}
                      onChange={(e) => {
                        setPersons((prev) =>
                          prev.map((person, i) =>
                            i === index
                              ? {
                                  ...person,
                                  days:
                                    parseInt(e.target.value) || (0 as number),
                                }
                              : person
                          )
                        );
                      }}
                      value={days}
                    />
                    <p className={styles["person__days-title"]}>Days</p>
                  </div>
                  <div className={styles["person__gastos"]}>
                    <p className={styles["person__gastos-value"]}>
                      {(Math.ceil(gastos * 100) / 100).toFixed(2)}
                    </p>
                    <p className={styles["person__gastos-title"]}>Gastos</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className={styles["persons_add-button"]}
          onClick={() =>
            setPersons((prev) => [...prev, { name: "", days: 30, gastos: 0 }])
          }
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default App;
