import React from "react";
import AddComment from "./AddComment";
import SingleComment from "./SingleComment";

interface CommentsProps {
  questionId: string;
  to: "questionComment" | "answerComment";
  comments?: Array<QuestionComment>;
}

export default function Comments({ questionId, to, comments }: CommentsProps) {
  if (!comments) {
    return <div>add comment</div>;
  }
  return (
    <div>
      <div>
        {comments.map((comment) => (
          <SingleComment data={comment} />
        ))}
      </div>
      <AddComment id={questionId} to={to} />
    </div>
  );
}
