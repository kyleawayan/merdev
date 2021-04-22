import React, { forwardRef, useEffect, useState } from "react";
import Upvoter from "../upvoter/UpvoterQuestionAnswer";
import styles from "../../../styles/questionViewer/answers/SingleAnswer.module.css";
import Text from "../Text";
import Comments from "../comments/Comments";
import firebase from "firebase/app";
import "firebase/firestore";
import Solved from "./Solved";
import Controls from "../Controls";
import UserCard from "../UserCard";

const db = firebase.firestore();

interface AnswerProps {
  data: Answer;
  questionId: string;
  questionUserUid: string;
}

export const SingleAnswer = forwardRef((props: AnswerProps, ref) => {
  const [comments, setComments] = useState<Array<QuestionOrAnswerComment>>();
  const data = props.data;
  const questionId = props.questionId;
  const questionUserUid = props.questionUserUid;

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

  return (
    // @ts-ignore
    <div ref={ref}>
      <div className={styles.question}>
        <div className={styles.text}>
          <div>
            <Upvoter
              questionId={questionId}
              type="answer"
              votes={data.counters.votes}
              answerId={data.id}
            />
            <Solved
              questionUserUid={questionUserUid}
              questionId={questionId}
              answerId={data.id}
              marked={data.marked}
            />
          </div>
          <div className={styles.markdown}>
            <Text value={data.markdown} />
            <div className={styles.userCard}>
              <UserCard
                displayName={data.author.displayName}
                userUid={data.author.userUid}
                datePosted={data.timestamp.toDate()}
                action="answered"
              />
            </div>
            <div className={styles.controls}>
              <Controls
                postUserUid={data.author.userUid}
                on="answer"
                questionId={questionId}
                answerId={data.id}
              />
            </div>
          </div>
        </div>
        <div className={styles.indented}>
          <div className={styles.line} />
          <Comments
            comments={comments}
            addCommentTo="answerComment"
            addCommentUpvotesTo="answer"
            questionId={questionId}
            answerId={data.id}
          />
        </div>
      </div>
      <div className={styles.bottomLine} />
    </div>
  );
});
