import React from "react";
import AddComment from "./AddComment";
import SingleComment from "./SingleComment";

interface CommentsProps {
  questionId: string;
  addCommentTo: "questionComment" | "answerComment";
  addCommentUpvotesTo: "question" | "answer";
  comments?: Array<QuestionOrAnswerComment>;
  answerId?: string;
}

export default function Comments({
  questionId,
  addCommentTo,
  addCommentUpvotesTo,
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
          <SingleComment
            data={comment}
            questionId={questionId}
            answerId={answerId}
            on={addCommentUpvotesTo}
            key={comment.id}
          />
        ))}
      </div>
      <AddComment id={questionId} to={addCommentTo} answerId={answerId} />
    </div>
  );
}
