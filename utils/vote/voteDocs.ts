import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore();

function questionDoc(
  questionId: string
): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> {
  return db.collection("questions").doc(questionId);
}

export function questionVoteDoc(questionId: string, userUid: string) {
  return questionDoc(questionId).collection("votes").doc(userUid);
}

export function answerVoteDoc(
  questionId: string,
  userUid: string,
  answerId: string
) {
  return questionDoc(questionId)
    .collection("answers")
    .doc(answerId)
    .collection("votes")
    .doc(userUid);
}

export function questionCommentVoteDoc(
  questionId: string,
  userUid: string,
  commentId: string
) {
  return questionDoc(questionId)
    .collection("questionComments")
    .doc(commentId)
    .collection("votes")
    .doc(userUid);
}

export function answerCommentVoteDoc(
  questionId: string,
  userUid: string,
  answerId: string,
  commentId: string
) {
  return questionDoc(questionId)
    .collection("answers")
    .doc(answerId)
    .collection("answerComments")
    .doc(commentId)
    .collection("votes")
    .doc(userUid);
}
