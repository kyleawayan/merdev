import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import SingleAnswer from "./SingleAnswer";
import YourAnswer from "./YourAnswer";
import AddAnswer from "./AddAnswer";

const db = firebase.firestore();

interface AnswersProps {
  questionId: string;
  questionUserUid: string;
}

export default function Answers({ questionId, questionUserUid }: AnswersProps) {
  const [data, setData] = useState<Array<Answer>>();
  const [hasAnswers, setHasAnswers] = useState(false);
  // make seperate boolean for no answers, so if someone is typing their answer
  // and someone makes an answer before them,
  // the text box won't disappear on them

  useEffect(() => {
    const unsubscribe = db
      .collection("questions")
      .doc(questionId)
      .collection("answers")
      .orderBy("marked", "desc")
      .orderBy("counters.votes", "desc")
      .onSnapshot((snapshot) => {
        if (snapshot.docs[0]) {
          setHasAnswers(true);
        }
        setData(
          snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          }) as Array<Answer>
        );
      });
    return () => unsubscribe();
  }, [questionId]);

  if (!data) {
    return <div></div>;
  }

  return (
    <div style={{ marginTop: "52px" }}>
      <h2>
        {data.length == 0
          ? "Your answer"
          : data.length > 1
          ? `${data.length} answers`
          : `${data.length} answer`}
      </h2>
      {!hasAnswers && (
        <YourAnswer
          questionId={questionId}
          submitted={() => setHasAnswers(true)}
        />
      )}
      <div>
        {data.map((answer) => (
          <SingleAnswer
            data={answer}
            questionId={questionId}
            questionUserUid={questionUserUid}
            key={answer.id}
          />
        ))}
      </div>
      {hasAnswers && <AddAnswer questionId={questionId} />}
    </div>
  );
}
