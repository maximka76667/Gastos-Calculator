import React from "react";
import styles from "./ExtraEsxpensesListItem.module.css";

interface ExtraExpensesListItemProps {
  extra: string;
  index: number;
  onExtraExpenseChange: (index: number, value: string) => void;
}

const ExtraExpensesListItem = ({
  extra,
  index,
  onExtraExpenseChange,
}: ExtraExpensesListItemProps) => {
  return (
    <input
      key={index}
      type="text"
      value={extra}
      name={`extra${index}`}
      className={styles["extra-exprense"]}
      onChange={(e) => onExtraExpenseChange(index, e.target.value || "")}
    />
  );
};

export default ExtraExpensesListItem;
