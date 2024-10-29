import React, { Dispatch, Fragment } from "react";
import { PersonInterface } from "../../types";
import styles from "./Person.module.css";
import { round } from "../../utils";
import ExtraExpensesListItem from "../ExtraExpensesListItem/ExtraExpensesListItem";
import StraightLine2 from "../../assets/images/Horizontal Straight Long Line 02.svg";
import MedLine2 from "../../assets/images/Horizontal Straight Med Line 04.svg";
import VerticalStraightLine01 from "../../assets/images/Vector Line Scribbles (Community)/Vertical Straight Line 01.svg";
import VerticalStraightLine02 from "../../assets/images/Vector Line Scribbles (Community)/Vertical Straight Line 02.svg";
import XMark04 from "../../assets/images/Vector Line Scribbles (Community)/X Mark 04.svg";
import Plus1 from "../../assets/images/Vector Line Scribbles (Community)/Plus 01.svg";
import Squiggle12 from "../../assets/images/Vector Line Scribbles (Community)/Squiggle Mini 12.svg";

interface PersonProps {
  id: number;
  person: PersonInterface;
  setPersons: Dispatch<React.SetStateAction<PersonInterface[]>>;
}

const Person = ({ id, person, setPersons }: PersonProps) => {
  const { name, days, gastos, extras } = person;

  const updatePerson = <T,>(key: string, value: T) => {
    return setPersons((prevPersons) =>
      prevPersons.map((p, index) => (index === id ? { ...p, [key]: value } : p))
    );
  };

  const removePerson = () => {
    setPersons((prev) => prev.filter((_, i) => i !== id));
  };

  return (
    <div key={id} className={styles["person"]}>
      {/* <img className={styles["person__frame-top"]} src={MedLine2} /> */}
      {/* {id % 2 === 0 ? (
        <>
          <img
            className={styles["person__frame-left-side"]}
            src={VerticalStraightLine01}
          />

          <img
            className={styles["person__frame-right-side"]}
            src={VerticalStraightLine02}
          />
        </>
      ) : (
        <>
          <img
            className={styles["person__frame-left-side"]}
            src={VerticalStraightLine02}
          />
          <img
            className={styles["person__frame-right-side"]}
            src={VerticalStraightLine01}
          />
        </>
      )} */}

      <div className={styles["person__remove"]} onClick={removePerson}>
        X
      </div>
      <div className={styles["person__name"]}>
        <input
          className={styles["person__name-input"]}
          type="text"
          placeholder="New person"
          onChange={(e) => updatePerson("name", e.target.value)}
          value={name}
        />
      </div>

      <img className={styles["person__frame-top"]} src={StraightLine2} />
      <h2 className={styles["person__extra-title"]}>Extra expenses</h2>
      {extras.map((extra, indexExtra) => (
        <Fragment key={indexExtra}>
          <ExtraExpensesListItem
            extra={extra}
            index={indexExtra}
            onExtraExpenseChange={(index, newValue) =>
              updatePerson(
                "extras",
                extras.map((extra, i) => {
                  return i === index ? newValue : extra;
                })
              )
            }
          />

          <img
            className={styles["person__frame-list-divider"]}
            src={StraightLine2}
          />
        </Fragment>
      ))}

      <button
        className={styles["button_add-extra"]}
        onClick={() => updatePerson("extras", [...person.extras, ""])}
      >
        <img src={Plus1} />
      </button>
      <img
        style={{ width: "90%", transform: "rotate(1deg)" }}
        src={StraightLine2}
      />
      <div className={styles["person__info"]}>
        <div className={styles["person__days"]}>
          <input
            className={styles["person__days-input"]}
            type="text"
            name={`days${id}`}
            id={`days${id}`}
            placeholder={`Days ${id}`}
            onChange={(e) =>
              updatePerson("days", parseFloat(e.target.value) || "")
            }
            value={days}
          />
          <p className={styles["person__days-title"]}>Days</p>
        </div>
        <img style={{ height: "120px" }} src={VerticalStraightLine01} />
        <div className={styles["person__gastos"]}>
          <p className={styles["person__gastos-value"]}>{round(gastos)}</p>
          <p className={styles["person__gastos-title"]}>Expenses</p>
        </div>
      </div>
      {/* <img className={styles["person__frame-bottom"]} src={MedLine2} /> */}
    </div>
  );
};

export default Person;
