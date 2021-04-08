import React from "react";
import IndividualCounter from "./IndividualCounter";
import styles from "../../../styles/homePage/recentQuestions/Counters.module.css";

interface CountersProps {
  data: QuestionCounters;
}

export default function Counters({ data }: CountersProps) {
  return (
    <div className={styles.counters}>
      <IndividualCounter count={355} label="votes" />
      <IndividualCounter count={355} label="answers" />
      <IndividualCounter count={355} label="views" />
    </div>
  );
}
