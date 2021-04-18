import React from "react";
import styles from "../../../../styles/questionViewer/upvoter/Upvoter.module.css";
import DownArrow from "../DownArrow";
import UpArrow from "../UpArrow";

interface LoadingUpvoterQuestionProps {
  votes: number;
}

export default function LoadingUpvoterQuestion({
  votes,
}: LoadingUpvoterQuestionProps) {
  return (
    <div className={styles.voter}>
      <div>
        <UpArrow highlighted={false} />
      </div>
      <div className={styles.voteNumber}>{votes}</div>
      <div>
        <DownArrow highlighted={false} />
      </div>
    </div>
  );
}
