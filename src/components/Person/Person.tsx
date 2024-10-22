import React, { ChangeEvent, ChangeEventHandler, Dispatch } from "react";
import { PersonInterface } from "../../types";
import styles from "./Person.module.css";
import { round } from "../../utils";

interface PersonProps {
  id: number;
  person: PersonInterface;
  setPersons: Dispatch<React.SetStateAction<PersonInterface[]>>;
}

const Person = ({ id, person, setPersons }: PersonProps) => {
  const { name, days, gastos, extras } = person;

  function changeExtraByIndex(extraIndex: number, newExtraValue: string) {
    return {
      ...person,
      extras: extras.map((extra, i) => {
        return i === extraIndex ? newExtraValue : extra;
      }),
    };
  }

  function handleExtras(e: ChangeEvent<HTMLInputElement>, indexExtra: number) {
    return setPersons((prev) =>
      prev.map((person, i) => {
        return id === i
          ? changeExtraByIndex(indexExtra, e.target.value || "")
          : person;
      })
    );
  }

  const handleAddExtras = () => {
    setPersons((prev) =>
      prev.map((person, i) =>
        i === id ? { ...person, extras: [...person.extras, ""] } : person
      )
    );
  };

  const handleRemovePerson = () => {
    setPersons((prev) => prev.filter((_, i) => i !== id));
  };

  const handleDaysChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPersons((prev) =>
      prev.map((person, i) =>
        i === id
          ? {
              ...person,
              days: parseFloat(e.target.value) || "",
            }
          : person
      )
    );
  };

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPersons((prev) =>
      prev.map((person, i) =>
        i === id
          ? {
              ...person,
              name: e.target.value,
            }
          : person
      )
    );
  };

  return (
    <div key={id} className={styles["person"]}>
      <div className={styles["person__remove"]} onClick={handleRemovePerson}>
        X
      </div>
      <div className={styles["person__name"]}>
        <input
          className={styles["person__name-input"]}
          type="text"
          placeholder="New person"
          onChange={handleNameChange}
          value={name}
        />
      </div>
      <div className={styles["person__info"]}>
        <div className={styles["person__days"]}>
          <input
            className={styles["person__days-input"]}
            type="text"
            name={`days${id}`}
            id={`days${id}`}
            placeholder={`Days ${id}`}
            onChange={handleDaysChange}
            value={days}
          />
          <p className={styles["person__days-title"]}>Days</p>
        </div>
        <div className={styles["person__gastos"]}>
          <p className={styles["person__gastos-value"]}>{round(gastos)}</p>
          <p className={styles["person__gastos-title"]}>Gastos</p>
        </div>
      </div>
      {extras.map((extra, indexExtra) => {
        return (
          <input
            key={indexExtra}
            type="text"
            value={extra}
            name={`extra${indexExtra}`}
            onChange={(e) => handleExtras(e, indexExtra)}
          />
        );
      })}
      <button onClick={handleAddExtras}>Add extra</button>
    </div>
  );
};

export default Person;
