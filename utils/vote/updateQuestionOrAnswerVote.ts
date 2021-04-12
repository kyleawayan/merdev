import { questionVoteDoc, answerVoteDoc } from "./voteDocs";

export function clearVote(
  questionId: string,
  userUid: string,
  type: "question" | "answer",
  answerId?: string
) {
  if (type == "question") {
    questionVoteDoc(questionId, userUid).delete();
  } else if (type == "answer" && answerId) {
    answerVoteDoc(questionId, userUid, answerId).delete();
  }
}

export function upvote(
  questionId: string,
  userUid: string,
  type: "question" | "answer",
  answerId?: string
) {
  if (type == "question") {
    questionVoteDoc(questionId, userUid).set({
      state: 1,
    });
  } else if (type == "answer" && answerId) {
    answerVoteDoc(questionId, userUid, answerId).set({
      state: 1,
    });
  }
}

export function downvote(
  questionId: string,
  userUid: string,
  type: "question" | "answer",
  answerId?: string
) {
  if (type == "question") {
    questionVoteDoc(questionId, userUid).set({
      state: -1,
    });
  } else if (type == "answer" && answerId) {
    answerVoteDoc(questionId, userUid, answerId).set({
      state: -1,
    });
  }
}
