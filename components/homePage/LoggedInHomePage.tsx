import React from "react";
import styles from "../../styles/homePage/LoggedInHomePage.module.css";
import RecentQuestions from "./RecentQuestions";

export default function LoggedInHomePage() {
  return (
    <div className={styles.loggedInHomePage}>
      <RecentQuestions />
    </div>
  );
}
