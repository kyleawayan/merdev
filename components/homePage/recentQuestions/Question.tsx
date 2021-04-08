import React from "react";
import Counters from "./Counters";
import styles from "../../../styles/homePage/recentQuestions/Question.module.css";

interface QuestionProps {
  data: Question;
}

export default function Question({ data }: QuestionProps) {
  return (
    <div className={styles.question}>
      <Counters data={data.counters} />
    </div>
  );
}
