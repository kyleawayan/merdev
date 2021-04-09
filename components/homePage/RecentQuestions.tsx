import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Question from "./recentQuestions/Question";
import styles from "../../styles/homePage/RecentQuestions.module.css";

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

  console.log(data);

  return (
    <div className={styles.recentQuestionsContainer}>
      <div className={styles.recentQuestions}>
        {data.map((question: Question) => (
          <Question data={question} key={question.id} />
        ))}
      </div>
      <div className={styles.sidebar}>i am sidebar</div>
    </div>
  );
}
