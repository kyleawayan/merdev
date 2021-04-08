import React from "react";
import Counters from "./Counters";
import styles from "../../../styles/homePage/recentQuestions/Question.module.css";
import Title from "./Title";
import Author from "./Author";

interface QuestionProps {
  data: Question;
}

export default function Question({ data }: QuestionProps) {
  console.log(data.timestamp.t);
  return (
    <div className={styles.question}>
      <Counters counters={data.counters} />
      <Title title={data.title} tags={data.tags} />
      <Author displayName={data.displayName} timestamp={data.timestamp} />
    </div>
  );
}
