import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const db = admin.firestore();

export const updateAnswerCounterOnCreate = functions.firestore
  .document("questions/{questionId}/answers/{answerId}")
  .onCreate(async (_, context) => {
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

export const updateAnswerCounterOnDelete = functions.firestore
  .document("questions/{questionId}/answers/{answerId}")
  .onDelete(async (_, context) => {
    const questionId = context.params.questionId;
    const answerCollectionDocs = await db
      .collection("questions")
      .doc(questionId)
      .collection("answers")
      .get();

    if (answerCollectionDocs.size != 0) {
      let i;
      for (i = 0; i < answerCollectionDocs.size; i++) {
        const docData = answerCollectionDocs.docs[i].data() as Answer;
        if (docData.marked == true) {
          db.collection("questions").doc(questionId).update({
            solved: true,
          });
          break;
        } else {
          db.collection("questions").doc(questionId).update({
            solved: false,
          });
        }
      }
    } else {
      db.collection("questions").doc(questionId).update({
        solved: false,
      });
    }

    const currentQuestionDoc = (await (
      await db.collection("questions").doc(questionId).get()
    ).data()) as Question;
    return db
      .collection("questions")
      .doc(questionId)
      .update({
        "counters.answers": currentQuestionDoc.counters.answers - 1,
      });
  });
