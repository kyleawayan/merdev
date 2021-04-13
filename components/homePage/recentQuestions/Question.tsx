import React from "react";
import Counters from "./Counters";
import styles from "../../../styles/homePage/recentQuestions/Question.module.css";
import Title from "./Title";
import Author from "./Author";

interface QuestionProps {
  data: Question;
}

export default function Question({ data }: QuestionProps) {
  return (
    <div className={styles.question}>
      <Counters counters={data.counters} answersHighlighted={data.solved} />
      <div className={styles.title}>
        <Title title={data.title} tags={data.tags} id={data.id} />
      </div>
      <Author
        displayName={data.author.displayName}
        timestamp={data.timestamp}
      />
    </div>
  );
}
