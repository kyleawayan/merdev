import React from "react";
import DownArrow from "./DownArrow";
import UpArrow from "./UpArrow";
import styles from "../../../styles/questionViewer/upvoter/UpvoterComment.module.css";
import firebase from "firebase/app";
import "firebase/firestore";

const vote = firebase.functions().httpsCallable("votes");

interface UpvoterProps {
  questionId: string;
  commentId: string;
  answerId?: string;
  votes: number;
  on: "question" | "answer";
}

export default function UpvoterComment({
  questionId,
  commentId,
  answerId,
  votes,
  on,
}: UpvoterProps) {
  const upvote = () => {
    vote({
      questionId: questionId,
      commentId: commentId,
      answerId: answerId,
      action: on == "question" ? 2 : 3,
      setState: 1,
    });
  };

  const downvote = () => {
    vote({
      questionId: questionId,
      commentId: commentId,
      answerId: answerId,
      action: on == "question" ? 2 : 3,
      setState: -1,
    });
  };

  return (
    <div className={styles.voter}>
      <span>
        <UpArrow width={18} onClick={upvote} />
      </span>
      <span className={styles.voteNumber}>{votes}</span>
      <span>
        <DownArrow width={18} onClick={downvote} />
      </span>
    </div>
  );
}
