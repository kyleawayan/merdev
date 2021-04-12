import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Question from "./recentQuestions/Question";
import styles from "../../styles/homePage/RecentQuestions.module.css";
import debounce from "debounce";

export default function RecentQuestions() {
  const db = firebase.firestore();
  const [data, setData] = useState<Array<Question>>([]);
  const [width, setWidth] = useState(999);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const updateSize = () => {
    setWidth(window.innerWidth);
  };

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

  useEffect(() => {
    window.addEventListener("resize", debounce(updateSize, 200));
    return () => {
      window.removeEventListener("resize", debounce(updateSize, 200));
    };
  });

  return (
    <div className={styles.recentQuestionsContainer}>
      <div className={styles.recentQuestions}>
        {data.map((question: Question) => (
          <Question data={question} key={question.id} />
        ))}
      </div>
      {width > 780 && <div className={styles.sidebar}>i am sidebar</div>}
    </div>
  );
}
