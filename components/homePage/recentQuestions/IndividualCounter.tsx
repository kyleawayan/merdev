import React from "react";
import styles from "../../../styles/homePage/recentQuestions/Counter.module.css";

interface CounterProps {
  count: number;
  label: string;
  isHighlighted?: boolean;
}

export default function IndividualCounter({
  count,
  label,
  isHighlighted,
}: CounterProps) {
  return (
    <span className={isHighlighted ? styles.highlighted : ""}>
      <div className={styles.counter}>{count}</div>
      <div className={styles.label}>
        {count != 1 ? label : label.slice(0, -1)}
      </div>
    </span>
  );
}
