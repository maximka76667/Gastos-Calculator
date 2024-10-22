import React, { ChangeEvent, Dispatch, MouseEvent } from "react";
import { PersonInterface } from "../../types";
import styles from "./Person.module.css";

interface PersonProps {
  index: number;
  person: PersonInterface;
  setPersons: Dispatch<React.SetStateAction<PersonInterface[]>>;
}

const Person = ({ index, person, setPersons }: PersonProps) => {
  const { name, days, gastos, extras } = person;

  function handleExtras(
    e: ChangeEvent<HTMLInputElement>,
    indexExtra: number,
    index: number
  ) {
    return setPersons((prev) =>
      prev.map((person, i) => {
        const { extras } = person;

        return index === i
          ? {
              ...person,
              extras: extras.map((extra, i) => {
                return i === indexExtra ? e.target.value || "" : extra;
              }),
            }
          : person;
      })
    );
  }

  function handleAddExtras(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    index: number
  ) {
    setPersons((prev) =>
      prev.map((person, i) =>
        i === index ? { ...person, extras: [...person.extras, ""] } : person
      )
    );
  }

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
          placeholder="New person"
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
                        days: parseFloat(e.target.value) || "",
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
      {extras.map((extra, indexExtra) => {
        return (
          <input
            type="text"
            value={extra}
            name={`extra${indexExtra}`}
            onChange={(e) => handleExtras(e, indexExtra, index)}
          />
        );
      })}
      <button onClick={(e) => handleAddExtras(e, index)}>Add extra</button>
    </div>
  );
};

export default Person;
