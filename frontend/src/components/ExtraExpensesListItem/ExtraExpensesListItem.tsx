import React, { useEffect, useState } from "react";
import styles from "./ExtraEsxpensesListItem.module.css";
import eraser from "../../assets/images/Eraser/eraser.png";

interface ExtraExpensesListItemProps {
  extra: { [key: string]: number };
  index: number;
  onExtraExpenseChange: (
    index: number,
    newValue: { [key: string]: number }
  ) => void;
  onExtraExpenseRemove: (index: number) => void;
}

const ExtraExpensesListItem = ({
  extra,
  index,
  onExtraExpenseChange,
  onExtraExpenseRemove,
}: ExtraExpensesListItemProps) => {
  const [expenseName, setExpenseName] = useState<string>(
    Object.keys(extra)[0] || ""
  );
  const [expenseValue, setExpenseValue] = useState<string>(
    Object.values(extra)[0] ? String(Object.values(extra)[0]) : ""
  );

  const [isAnimating, setIsAnimating] = useState(false);

  const handleButtonClick = () => {
    setIsAnimating(true);

    // Remove the animation class after the animation completes
    setTimeout(() => {
      setIsAnimating(false);
      onExtraExpenseRemove(index);
    }, 550); // Match this duration to your animation duration
  };

  useEffect(() => {
    onExtraExpenseChange(index, {
      [expenseName]: parseFloat(expenseValue) || 0,
    });
  }, [expenseName, expenseValue]);

  return (
    <div
      className={`${styles["extra-expense"]} ${
        isAnimating ? styles["extra-expense_animated"] : ""
      }`}
    >
      <input
        type="text"
        value={expenseName}
        name={`extra-name${index}`}
        className={styles["extra-expense__name"]}
        placeholder="Expense"
        onChange={(e) => setExpenseName(e.target.value)}
      />
      <input
        type="text"
        value={expenseValue}
        name={`extra-value${index}`}
        placeholder="€"
        className={styles["extra-expense__value"]}
        onChange={(e) => setExpenseValue(e.target.value)}
      />
      <div
        className={`${styles["extra-expense__erasing-div"]} ${
          isAnimating ? styles["extra-expense__erasing-div_animated"] : ""
        }`}
      ></div>
      <button
        onClick={handleButtonClick}
        className={`${styles["extra-expense__remove-button"]} ${
          isAnimating ? styles["extra-expense__remove-button_animated"] : ""
        }`}
      >
        <img src={eraser} alt="Eraser" />
      </button>
    </div>
  );
};

export default ExtraExpensesListItem;
