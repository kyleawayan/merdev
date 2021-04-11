import React from "react";
import IndividualCounter from "./IndividualCounter";
import styles from "../../../styles/homePage/recentQuestions/Counters.module.css";

interface CountersProps {
  counters: QuestionCounters;
  answersHighlighted: boolean;
}

export default function Counters({
  counters,
  answersHighlighted,
}: CountersProps) {
  return (
    <div className={styles.counters}>
      <IndividualCounter count={counters.votes} label="votes" />
      <IndividualCounter
        count={counters.answers}
        isHighlighted={answersHighlighted}
        label="answers"
      />
      <IndividualCounter count={counters.views} label="views" />
    </div>
  );
}
