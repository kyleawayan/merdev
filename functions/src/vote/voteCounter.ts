import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const db = admin.firestore();

/**
 * The doucment reference to the question document.
 * @param {string} questionId - The question ID.
 * @return {FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>} The Firestore document reference.
 */
function questionDoc(questionId: string) {
  return db.collection("questions").doc(questionId);
}

export const updateQuestionVoteCounter = functions.firestore
  .document("questions/{questionId}/votes/{userUid}")
  .onWrite(async (change, context) => {
    const questionId = context.params.questionId;
    const beforeState = change.before.data()?.state ?? (0 as Votes);
    const afterState = change.after.data()?.state ?? (0 as Votes);
    const currentQuestionDoc = (await (
      await questionDoc(questionId).get()
    ).data()) as Question;
    return questionDoc(questionId).update({
      "counters.votes":
        currentQuestionDoc.counters.votes + afterState - beforeState,
    });
  });

export const updateAnswerVoteCounter = functions.firestore
  .document("questions/{questionId}/answers/{answerId}/votes/{userUid}")
  .onWrite(async (change, context) => {
    const questionId = context.params.questionId;
    const answerId = context.params.answerId;
    const beforeState = change.before.data()?.state ?? (0 as Votes);
    const afterState = change.after.data()?.state ?? (0 as Votes);
    const currentAnswerDoc = (await (
      await questionDoc(questionId).collection("answers").doc(answerId).get()
    ).data()) as Answer;
    return questionDoc(questionId)
      .collection("answers")
      .doc(answerId)
      .update({
        "counters.votes":
          currentAnswerDoc.counters.votes + afterState - beforeState,
      });
  });

export const updateQuestionCommentVoteCounter = functions.firestore
  .document(
    "questions/{questionId}/questionComments/{commentId}/votes/{userUid}"
  )
  .onWrite(async (change, context) => {
    const questionId = context.params.questionId;
    const commentId = context.params.commentId;
    const beforeState = change.before.data()?.state ?? (0 as Votes);
    const afterState = change.after.data()?.state ?? (0 as Votes);
    const currentQuestionCommentDoc = (await (
      await questionDoc(questionId)
        .collection("questionComments")
        .doc(commentId)
        .get()
    ).data()) as QuestionOrAnswerComment;
    return questionDoc(questionId)
      .collection("questionComments")
      .doc(commentId)
      .update({
        "counters.votes":
          currentQuestionCommentDoc.counters.votes + afterState - beforeState,
      });
  });

export const updateAnswerCommentVoteCounter = functions.firestore
  .document(
    "questions/{questionId}/answers/{answerId}/answerComments/{commentId}/votes/{userUid}"
  )
  .onWrite(async (change, context) => {
    const questionId = context.params.questionId;
    const answerId = context.params.answerId;
    const commentId = context.params.commentId;
    const beforeState = change.before.data()?.state ?? (0 as Votes);
    const afterState = change.after.data()?.state ?? (0 as Votes);
    const currentAnswerCommentDoc = (await (
      await questionDoc(questionId)
        .collection("answers")
        .doc(answerId)
        .collection("answerComments")
        .doc(commentId)
        .get()
    ).data()) as QuestionOrAnswerComment;
    return questionDoc(questionId)
      .collection("answers")
      .doc(answerId)
      .collection("answerComments")
      .doc(commentId)
      .update({
        "counters.votes":
          currentAnswerCommentDoc.counters.votes + afterState - beforeState,
      });
  });
