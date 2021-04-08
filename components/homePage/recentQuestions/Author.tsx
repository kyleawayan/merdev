import React from "react";
import styles from "../../../styles/homePage/recentQuestions/Author.module.css";
import Moment from "react-moment";

interface AuthorProps {
  displayName: string;
  timestamp: any;
}

export default function Author({ displayName, timestamp }: AuthorProps) {
  const date = timestamp.toDate();

  return (
    <div className={styles.authorContainer}>
      <div className={styles.author}>
        asked {<Moment date={date} format="m" durationFromNow />} minutes ago by{" "}
        {displayName}
      </div>
    </div>
  );
}
