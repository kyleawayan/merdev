import React from "react";
import DownArrow from "./DownArrow";
import UpArrow from "./UpArrow";
import styles from "../../../styles/questionViewer/upvoter/UpvoterComment.module.css";

interface UpvoterProps {
  commentId?: string;
  on?: "question" | "answer";
}

export default function UpvoterComment({ commentId, on }: UpvoterProps) {
  return (
    <div className={styles.voter}>
      <span>
        <UpArrow width={18} />
      </span>
      <span className={styles.voteNumber}>0</span>
      <span>
        <DownArrow width={18} />
      </span>
    </div>
  );
}
