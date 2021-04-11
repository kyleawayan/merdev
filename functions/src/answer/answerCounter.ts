/* eslint-disable max-len */
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const db = admin.firestore();

export const updateAnswerCounter = functions.firestore
  .document("questions/{questionId}/answers/{answerId}")
  .onCreate(async (snap, context) => {
    const questionId = context.params.questionId;
    const currentQuestionDoc = (await (
      await db.collection("questions").doc(questionId).get()
    ).data()) as Question;
    return db
      .collection("questions")
      .doc(questionId)
      .update({
        "counters.answers": currentQuestionDoc.counters.answers + 1,
      });
  });
