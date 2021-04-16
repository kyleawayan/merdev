import React, { useState } from "react";
import AnswerEditor from "./AnswerEditor";
import firebase from "firebase/app";
import "firebase/firestore";
import { useAuth } from "../../../utils/use-auth";

const db = firebase.firestore();

interface YourAnswerProps {
  questionId: string;
  submitted?: () => void;
}

export default function YourAnswer({ questionId, submitted }: YourAnswerProps) {
  const auth = useAuth();
  const [value, setValue] = useState("");

  const submitAnswer = () => {
    db.collection("questions")
      .doc(questionId)
      .collection("answers")
      .add({
        author: {
          userUid: auth.user.uid,
          displayName: auth.user.displayName,
        },
        markdown: btoa(value),
        timestamp: new Date(),
        counters: {
          votes: 0,
        },
      })
      .then(() => {
        if (submitted) {
          submitted();
        }
      });
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      <AnswerEditor value={value} onChange={setValue} />
      <button onClick={submitAnswer}>submit</button>
    </div>
  );
}
