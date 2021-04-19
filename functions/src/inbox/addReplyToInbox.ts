import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
const db = admin.firestore();

export const addQuestionCommentReplyToInbox = functions.firestore
  .document("questions/{questionId}/questionComments/{commentId}")
  .onCreate(async (snap, context) => {
    const questionId = context.params.questionId;
    const commentId = context.params.commentId;
    const snapData = snap.data() as QuestionOrAnswerComment;

    const questionDoc = (await (
      await db.collection("questions").doc(questionId).get()
    ).data()) as Question;

    const questionAuthorUid = questionDoc.author.userUid;

    return db
      .collection("users")
      .doc(questionAuthorUid)
      .collection("inbox")
      .add({
        type: "comment",
        preview:
          snapData.markdown.substring(0, 97) +
            `${snapData.markdown.length > 97 ? "..." : ""}` ?? "",
        timestamp: snapData.timestamp,
        questionId: questionId,
        commentId: commentId,
        read: false,
      });
  });

export const addAnswerReplyToInbox = functions.firestore
  .document("questions/{questionId}/answers/{answerId}")
  .onCreate(async (snap, context) => {
    const questionId = context.params.questionId;
    const answerId = context.params.answerId;
    const snapData = snap.data() as Answer;

    const answerDoc = (await (
      await db.collection("questions").doc(questionId).get()
    ).data()) as Question;

    const questionAuthorUid = answerDoc.author.userUid;

    return db
      .collection("users")
      .doc(questionAuthorUid)
      .collection("inbox")
      .add({
        type: "answer",
        preview:
          snapData.markdown.substring(0, 97) +
            `${snapData.markdown.length > 97 ? "..." : ""}` ?? "",
        timestamp: snapData.timestamp,
        questionId: questionId,
        answerId: answerId,
        read: false,
      });
  });

export const addAnswerCommentToInbox = functions.firestore
  .document(
    "questions/{questionId}/answers/{answerId}/answerComments/{commentId}"
  )
  .onCreate(async (snap, context) => {
    const questionId = context.params.questionId;
    const answerId = context.params.answerId;
    const commentId = context.params.commentId;
    const snapData = snap.data() as QuestionOrAnswerComment;

    const questionDoc = (await (
      await db.collection("questions").doc(questionId).get()
    ).data()) as Question;

    const questionAuthorUid = questionDoc.author.userUid;

    return db
      .collection("users")
      .doc(questionAuthorUid)
      .collection("inbox")
      .add({
        type: "comment",
        preview:
          snapData.markdown.substring(0, 97) +
            `${snapData.markdown.length > 97 ? "..." : ""}` ?? "",
        timestamp: snapData.timestamp,
        questionId: questionId,
        answerId: answerId,
        commentId: commentId,
        read: false,
      });
  });
