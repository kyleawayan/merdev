import React, { useState } from "react";
import AnswerEditor from "./AnswerEditor";
import firebase from "firebase/app";
import "firebase/firestore";
import { useAuth } from "../../../utils/use-auth";
import styles from "../../../styles/questionViewer/answers/YourAnswer.module.css";
// import useNavigationLock from "../../../utils/useNavigationLock";

const db = firebase.firestore();

interface YourAnswerProps {
  questionId: string;
  submitted?: () => void;
}

export default function YourAnswer({ questionId, submitted }: YourAnswerProps) {
  const auth = useAuth();
  const [value, setValue] = useState("");

  // if (value) {
  //   useNavigationLock(true);
  // } else {
  //   useNavigationLock(false);
  // }

  const submitAnswer = () => {
    db.collection("questions")
      .doc(questionId)
      .collection("answers")
      .add({
        author: {
          userUid: auth.user.uid,
          displayName: auth.user.displayName,
        },
        markdown: value,
        timestamp: new Date(),
        counters: {
          votes: 0,
        },
        marked: false,
      })
      .then(() => {
        if (submitted) {
          submitted();
        }
      });
  };

  return (
    <div className={styles.yourAnswer}>
      <div className={styles.editor}>
        <AnswerEditor value={value} onChange={setValue} />
      </div>
      <button onClick={submitAnswer}>Submit Answer</button>
    </div>
  );
}
