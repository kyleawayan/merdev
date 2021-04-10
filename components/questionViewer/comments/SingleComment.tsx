import React from "react";
import UpvoterComment from "../upvoter/UpvoterComment";
import styles from "../../../styles/questionViewer/comments/SingleComment.module.css";
import Text from "../Text";

interface CommentProps {
  data: QuestionOrAnswerComment;
}

export default function SingleComment({ data }: CommentProps) {
  return (
    <div>
      <div className={styles.singleComment}>
        <div className={styles.upvoter}>
          <UpvoterComment />
        </div>
        <div className={styles.text}>
          <Text value={atob(data.markdown) + ` – ${data.displayName}`} />
        </div>
      </div>
      <div className={styles.line} />
    </div>
  );
}
