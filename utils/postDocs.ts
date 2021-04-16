import firebase from "firebase/app";

const db = firebase.firestore();

function questionDoc(
  questionId: string
): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> {
  return db.collection("questions").doc(questionId);
}

export function answerDoc(questionId: string, answerId: string) {
  return questionDoc(questionId).collection("answers").doc(answerId);
}

export function questionCommentDoc(questionId: string, commentId: string) {
  return questionDoc(questionId).collection("questionComments").doc(commentId);
}

export function answerCommentDoc(
  questionId: string,
  answerId: string,
  commentId: string
) {
  return questionDoc(questionId)
    .collection("answers")
    .doc(answerId)
    .collection("answerComments")
    .doc(commentId);
}
