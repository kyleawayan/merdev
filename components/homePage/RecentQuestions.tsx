import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Question from "./recentQuestions/Question";

export default function RecentQuestions() {
  const db = firebase.firestore();
  const [data, setData] = useState<Array<Question>>([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("questions")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setData(
          snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          }) as Array<Question>
        );
      });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div>
        {data.map((question: Question) => (
          <Question data={question} key={question.id} />
        ))}
      </div>
    </div>
  );
}
