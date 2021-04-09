import React from "react";
import UpvoterComment from "../upvoter/UpvoterComment";
import styles from "../../../styles/questionViewer/comments/SingleComment.module.css";
import Text from "../Text";

interface CommentProps {
  data: QuestionComment;
}

export default function SingleComment({ data }: CommentProps) {
  console.log(data);
  return (
    <div>
      <div className={styles.singleComment}>
        <UpvoterComment />
        <div className={styles.text}>
          <Text value={atob(data.markdown)} />
        </div>
      </div>
      <div className={styles.line} />
    </div>
  );
}
