import React, { useEffect, useState } from "react";
import Upvoter from "../upvoter/UpvoterQuestionAnswer";
import styles from "../../../styles/questionViewer/answers/SingleAnswer.module.css";
import Text from "../Text";
import Comments from "../comments/Comments";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore();

interface AnswerProps {
  data: Answer;
  questionId: string;
}

export default function SingleAnswer({ data, questionId }: AnswerProps) {
  const [comments, setComments] = useState<Array<QuestionOrAnswerComment>>();

  useEffect(() => {
    // get answer comments
    const unsubscribe = db
      .collection("questions")
      .doc(questionId)
      .collection("answers")
      .doc(data.id)
      .collection("answerComments")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          }) as Array<QuestionOrAnswerComment>
        );
      });
    return () => unsubscribe();
  }, []);

  console.log(comments);

  return (
    <div>
      <div className={styles.question}>
        <div className={styles.text}>
          <Upvoter postId={data.id} />
          <div className={styles.markdown}>
            <Text value={atob(data.markdown)} />
          </div>
        </div>
        <div className={styles.indented}>
          <div className={styles.line} />
          <Comments
            comments={comments}
            to="answerComment"
            questionId={questionId}
            answerId={data.id}
          />
        </div>
      </div>
      <div className={styles.bottomLine} />
    </div>
  );
}
