import React from "react";
import QuestionMakerEditor from "../components/ask/QuestionMakerEditor";
import RulesAndStuff from "../components/ask/RulesAndStuff";
import styles from "../styles/ask/ask.module.css";

export default function Ask() {
  return (
    <div style={{ height: "800px" }}>
      <div className="globalContainer">
        <div className={styles.askContainer}>
          <QuestionMakerEditor />
          <RulesAndStuff />
        </div>
      </div>
    </div>
  );
}
