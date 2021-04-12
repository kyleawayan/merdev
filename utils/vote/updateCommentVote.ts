import { answerCommentVoteDoc, questionCommentVoteDoc } from "./voteDocs";

export function clearVote(
  questionId: string,
  userUid: string,
  commentId: string,
  on: "question" | "answer",
  answerId?: string
) {
  if (on == "question") {
    questionCommentVoteDoc(questionId, userUid, commentId).delete();
  } else if (on == "answer" && answerId) {
    answerCommentVoteDoc(questionId, userUid, answerId, commentId).delete();
  }
}

export function upvote(
  questionId: string,
  userUid: string,
  commentId: string,
  on: "question" | "answer",
  answerId?: string
) {
  if (on == "question") {
    questionCommentVoteDoc(questionId, userUid, commentId).set({
      state: 1,
    });
  } else if (on == "answer" && answerId) {
    answerCommentVoteDoc(questionId, userUid, answerId, commentId).set({
      state: 1,
    });
  }
}

export function downvote(
  questionId: string,
  userUid: string,
  commentId: string,
  on: "question" | "answer",
  answerId?: string
) {
  if (on == "question") {
    questionCommentVoteDoc(questionId, userUid, commentId).set({
      state: -1,
    });
  } else if (on == "answer" && answerId) {
    answerCommentVoteDoc(questionId, userUid, answerId, commentId).set({
      state: -1,
    });
  }
}
