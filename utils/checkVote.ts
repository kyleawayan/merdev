import firebase from "firebase/app";

const db = firebase.firestore();

function questionDoc(
  questionId: string
): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> {
  return db.collection("questions").doc(questionId);
}

export function checkQuestionVote(
  questionId: string,
  userUid: string
): Promise<
  firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
> {
  return questionDoc(questionId).collection("votes").doc(userUid).get();
}

export function checkAnswerVote(
  questionId: string,
  userUid: string,
  answerId: string
): Promise<
  firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
> {
  return questionDoc(questionId)
    .collection("answers")
    .doc(answerId)
    .collection("votes")
    .doc(userUid)
    .get();
}

export function checkQuestionCommentVote(
  questionId: string,
  userUid: string,
  commentId: string
): Promise<
  firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
> {
  return questionDoc(questionId)
    .collection("questionComments")
    .doc(commentId)
    .collection("votes")
    .doc(userUid)
    .get();
}

export function checkAnswerCommentVote(
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
    .doc(userUid)
    .get();
}
