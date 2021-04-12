import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const db = admin.firestore();

export const updateVoteCounter = functions.firestore
  .document("questions/{questionId}/votes/{userUid}")
  .onWrite(async (change, context) => {
    const questionId = context.params.questionId;
    const beforeState = change.before.data()?.state ?? (0 as Votes);
    const afterState = change.after.data()?.state ?? (0 as Votes);
    console.log(beforeState, afterState);
    const currentQuestionDoc = (await (
      await db.collection("questions").doc(questionId).get()
    ).data()) as Question;
    return db
      .collection("questions")
      .doc(questionId)
      .update({
        "counters.votes":
          currentQuestionDoc.counters.votes + afterState - beforeState,
      });
  });
