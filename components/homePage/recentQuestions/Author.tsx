import React, { useEffect, useState } from "react";
import styles from "../../../styles/homePage/recentQuestions/Author.module.css";
import Moment from "react-moment";
import userUidToDisplayName from "../../../utils/userUidToDisplayName";

interface AuthorProps {
  userUid: string;
  timestamp: any;
}

export default function Author({ userUid, timestamp }: AuthorProps) {
  const [displayName, setDisplayName] = useState("");
  const date = timestamp.toDate();

  useEffect(() => {
    userUidToDisplayName(userUid)
      .then((response) => {
        setDisplayName(response.data.displayName);
      })
      .catch(console.error);
  }, []);

  return (
    <div className={styles.authorContainer}>
      <div className={styles.author}>
        asked {<Moment date={date} format="m" durationFromNow />} minutes ago by{" "}
        {displayName}
      </div>
    </div>
  );
}
