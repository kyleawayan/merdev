import * as functions from "firebase-functions";
import questionVote from "./question";
import answerVote from "./answer";

export const vote = functions.https.onCall((data, context) => {
  // 0: question
  // 1: answer
  // 2: questionComment
  // 3: answerComment
  if (context.auth) {
    const userUid = context.auth.uid;
    const questionId: string = data.questionId;
    const answerId: string = data.answerId;
    // const commentId: string = data.commentId;
    const action: number = data.action;
    const requestedState: number = data.setState;
    if (action != null && requestedState != null) {
      switch (action) {
        case 0:
          questionVote(questionId, userUid, requestedState);
          break;
        case 1:
          answerVote(questionId, userUid, answerId, requestedState);
          break;
      }
    } else {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "action or requestedState was not supplied"
      );
    }
  } else {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in"
    );
  }
});
