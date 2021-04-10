import React from "react";
import AddComment from "./AddComment";
import SingleComment from "./SingleComment";

interface CommentsProps {
  questionId: string;
  to: "questionComment" | "answerComment";
  comments?: Array<QuestionOrAnswerComment>;
  answerId?: string;
}

export default function Comments({
  questionId,
  to,
  comments,
  answerId,
}: CommentsProps) {
  if (!comments) {
    return <div>add comment</div>;
  }
  return (
    <div>
      <div>
        {comments.map((comment) => (
          <SingleComment data={comment} key={comment.id} />
        ))}
      </div>
      <AddComment id={questionId} to={to} answerId={answerId} />
    </div>
  );
}
