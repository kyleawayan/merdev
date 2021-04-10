import React from "react";
import DownArrow from "./DownArrow";
import UpArrow from "./UpArrow";
import styles from "../../../styles/questionViewer/upvoter/Upvoter.module.css";
import firebase from "firebase/app";
import "firebase/firestore";

const vote = firebase.functions().httpsCallable("votes");

interface UpvoterProps {
  questionId: string;
  answerId?: string;
  type: "question" | "answer";
  votes: number;
}

export default function Upvoter({
  questionId,
  answerId,
  type,
  votes,
}: UpvoterProps) {
  const upvote = () => {
    vote({
      questionId: questionId,
      answerId: answerId,
      action: type == "question" ? 0 : 1,
      setState: 1,
    });
  };

  const downvote = () => {
    vote({
      questionId: questionId,
      answerId: answerId,
      action: type == "question" ? 0 : 1,
      setState: -1,
    });
  };

  return (
    <div className={styles.voter}>
      <div>
        <UpArrow onClick={upvote} />
      </div>
      <div className={styles.voteNumber}>{votes}</div>
      <div>
        <DownArrow onClick={downvote} />
      </div>
    </div>
  );
}
