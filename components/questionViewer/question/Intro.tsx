import React from "react";
import Tags from "../../homePage/recentQuestions/Tags";
import styles from "../../../styles/questionViewer/question/Intro.module.css";
import Moment from "react-moment";

interface TitleProps {
  title: string;
  tags: Array<string>;
  askedDate: Date;
  viewed: number;
}

export default function Intro({ title, tags, askedDate, viewed }: TitleProps) {
  return (
    <div className={styles.intro}>
      <h1>{title}</h1>
      <Tags tags={tags} />
      <div className={styles.info}>
        <span className={styles.secondary}>Asked </span>
        <span>{<Moment date={askedDate} fromNow />}</span>
        {"  "}
        <span className={styles.secondary}>Viewed </span>
        <span>
          {viewed} {viewed > 1 || viewed == 0 ? "times" : "time"}
        </span>
      </div>
    </div>
  );
}
