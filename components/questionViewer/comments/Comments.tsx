import React from "react";
import AddComment from "./AddComment";
import SingleComment from "./SingleComment";

interface CommentsProps {
  comments?: Array<QuestionComment>;
}

export default function Comments({ comments }: CommentsProps) {
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
      <AddComment />
    </div>
  );
}
