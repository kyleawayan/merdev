import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Question from "./recentQuestions/Question";

export default function RecentQuestions() {
  const db = firebase.firestore();
  const [data, setData] = useState<Array<Question>>([]);

  useEffect(() => {
    const unsubscribe = db.collection("questions").onSnapshot((snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()) as Array<Question>);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {data.map((question: Question) => (
        <Question data={question} />
      ))}
    </div>
  );
}
