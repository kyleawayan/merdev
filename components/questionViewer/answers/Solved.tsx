import React, { useState } from "react";
import { useAuth } from "../../../utils/use-auth";
import firebase from "firebase/app";
import "firebase/firestore";
import Checkmark from "./Checkmark";

const db = firebase.firestore();

function markAnswer(questionId: string, answerId: string, mark: boolean) {
  return db
    .collection("questions")
    .doc(questionId)
    .collection("answers")
    .doc(answerId)
    .update({
      marked: mark,
    });
}

interface SolvedProps {
  questionUserUid: string;
  questionId: string;
  answerId: string;
  marked: boolean;
}

export default function Solved({
  questionUserUid,
  questionId,
  answerId,
  marked,
}: SolvedProps) {
  const auth = useAuth();

  const markSolved = () => {
    if (!marked) {
      markAnswer(questionId, answerId, true);
    } else {
      markAnswer(questionId, answerId, false);
    }
  };

  return (
    <div>
      {(questionUserUid == auth.user.uid || marked) && (
        <div onClick={markSolved} style={{ marginTop: "10px" }}>
          <Checkmark width={25} filled={marked} />
        </div>
      )}
    </div>
  );
}
