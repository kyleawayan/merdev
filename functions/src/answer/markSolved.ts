import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const db = admin.firestore();

// to do: make sure this function doesn't run when answer votes are updated
export const markSolved = functions.firestore
  .document("questions/{questionId}/answers/{answerId}")
  .onUpdate(async (_, context) => {
    const questionId = context.params.questionId;

    const answerCollectionDocs = await db
      .collection("questions")
      .doc(questionId)
      .collection("answers")
      .get();

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
    // const currentQuestionDoc = (await (
    //   await db.collection("questions").doc(questionId).get()
    // ).data()) as Question;
    // return db
    //   .collection("questions")
    //   .doc(questionId)
    //   .update({
    //     "solved": true,
    //   });
  });
