import React, { useEffect, useState } from "react";
import Intro from "./Intro";
import Upvoter from "../upvoter/UpvoterQuestionAnswer";
import styles from "../../../styles/questionViewer/question/QuestionViewer.module.css";
import Text from "../Text";
import Comments from "../comments/Comments";
import firebase from "firebase/app";
import "firebase/firestore";
import Controls from "../Controls";

const db = firebase.firestore();

interface QuestionProps {
  data: Question;
}

export default function Question({ data }: QuestionProps) {
  const [comments, setComments] = useState<Array<QuestionOrAnswerComment>>();

  useEffect(() => {
    // get question comments
    const unsubscribe = db
      .collection("questions")
      .doc(data.id)
      .collection("questionComments")
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
    <div className={styles.question}>
      <Intro
        title={data.title}
        tags={data.tags}
        askedDate={data.timestamp}
        viewed={data.counters.views}
      />
      <div className={styles.text}>
        <Upvoter
          questionId={data.id}
          type="question"
          votes={data.counters.votes}
        />
        <div className={styles.markdown}>
          <Text value={data.markdown} />
          <div className={styles.controls}>
            <Controls
              postUserUid={data.author.userUid}
              on="question"
              questionId={data.id}
            />
          </div>
        </div>
      </div>
      <div className={styles.indented}>
        <div className={styles.line} />
        <Comments
          comments={comments}
          addCommentTo="questionComment"
          addCommentUpvotesTo="question"
          questionId={data.id}
        />
      </div>
    </div>
  );
}
