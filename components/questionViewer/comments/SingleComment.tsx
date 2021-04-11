import React from "react";
import UpvoterComment from "../upvoter/UpvoterComment";
import styles from "../../../styles/questionViewer/comments/SingleComment.module.css";
import Text from "../Text";

interface CommentProps {
  data: QuestionOrAnswerComment;
  questionId: string;
  answerId?: string;
  on: "question" | "answer";
}

export default function SingleComment({
  data,
  questionId,
  answerId,
  on,
}: CommentProps) {
  return (
    <div>
      <div className={styles.singleComment}>
        <div className={styles.upvoter}>
          <UpvoterComment
            questionId={questionId}
            answerId={answerId}
            commentId={data.id}
            on={on}
            votes={data.counters.votes}
          />
        </div>
        <div className={styles.text}>
          <Text value={atob(data.markdown) + ` – ${data.displayName}`} />
        </div>
      </div>
      <div className={styles.line} />
    </div>
  );
}
