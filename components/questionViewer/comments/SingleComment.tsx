import React, { useState } from "react";
import UpvoterComment from "../upvoter/UpvoterComment";
import styles from "../../../styles/questionViewer/comments/SingleComment.module.css";
import Text from "../Text";
import { useAuth } from "../../../utils/use-auth";
import { questionCommentDoc, answerCommentDoc } from "../../../utils/postDocs";

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
  const auth = useAuth();
  const [hovering, setHovering] = useState(false);

  const deleteComment = () => {
    let confirm = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirm) {
      if (on == "question") {
        questionCommentDoc(questionId, data.id).delete();
      } else if (on == "answer" && answerId) {
        answerCommentDoc(questionId, answerId, data.id).delete();
      }
    }
  };

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
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
          <Text value={data.markdown + ` – ${data.author.displayName}`} />
        </div>
        {auth.user.uid == data.author.userUid && hovering && (
          <div className={styles.delete}>
            <div onClick={deleteComment} style={{ cursor: "pointer" }}>
              Delete
            </div>
          </div>
        )}
      </div>
      <div className={styles.line} />
    </div>
  );
}
