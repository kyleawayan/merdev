import React from "react";
import styles from "../../../styles/homePage/recentQuestions/Author.module.css";
import Moment from "react-moment";

interface AuthorProps {
  displayName: string;
  timestamp: Date;
}

export default function Author({ displayName, timestamp }: AuthorProps) {
  return (
    <div className={styles.authorContainer}>
      <div className={styles.author}>
        asked {<Moment date={timestamp} fromNow />} by {displayName}
      </div>
    </div>
  );
}
