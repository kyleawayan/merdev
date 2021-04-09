import React from "react";
import DownArrow from "./DownArrow";
import UpArrow from "./UpArrow";
import styles from "../../../styles/questionViewer/Upvoter.module.css";

interface UpvoterProps {
  postId: string;
}

export default function Upvoter({ postId }: UpvoterProps) {
  return (
    <div className={styles.voter}>
      <div>
        <UpArrow />
      </div>
      <div className={styles.voteNumber}>0</div>
      <div>
        <DownArrow />
      </div>
    </div>
  );
}
