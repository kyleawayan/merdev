/* eslint-disable max-len */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

/**
 * Add or subtract to the vote counter.
 * @param {FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>} questionDoc The postDoc reference.
 * @param {number} add Number of votes to add or subtract.
 * @param {string} commentId Comment ID.
 * @param {string} userUid The user's UID.
 * @return {Promise<FirebaseFirestore.WriteResult>} Returns a void promise.
 */
async function changeVoteCounter(
  questionDoc: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
  add: number,
  commentId: string
): Promise<FirebaseFirestore.WriteResult> {
  const questionCommentDocData = (
    await questionDoc.collection("questionComments").doc(commentId).get()
  ).data() as QuestionOrAnswerComment;
  const currentVoteCount = questionCommentDocData.counters.votes ?? 0;
  console.log(currentVoteCount, add);
  return questionDoc
    .collection("questionComments")
    .doc(commentId)
    .update({
      "counters.votes": currentVoteCount + add ?? 0,
    });
}

/**
 * In here change/add specific state to votes collection,
 * and also add to vote counter on question doc.
 * @param {number} state Set vote state.
 * @param {FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>} questionDoc The postDoc reference.
 * @param {string} userUid The user's UID.
 * @param {string} commentId The user's UID.
 * @param {number?} currentState The original state before modification, so if something requests a state of 0, we can add or subtract the votes accordingly.
 * @return {Promise<void>} Returns a void promise.
 */
async function changeVote(
  state: number,
  questionDoc: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
  userUid: string,
  commentId: string,
  currentState?: number
): Promise<void> {
  if (state != 0) {
    await questionDoc
      .collection("questionComments")
      .doc(commentId)
      .collection("votes")
      .doc(userUid)
      .set({
        state: state,
      });
    changeVoteCounter(questionDoc, state == 1 ? 1 : -1, commentId);
  } else {
    await questionDoc
      .collection("questionComments")
      .doc(commentId)
      .collection("votes")
      .doc(userUid)
      .delete();
    if (currentState == 1) {
      changeVoteCounter(questionDoc, -1, commentId);
    } else if (currentState == -1) {
      changeVoteCounter(questionDoc, 1, commentId);
    }
  }
}

/**
 * Change a vote for a question.
 * @param {string} questionId The question doc ID in Firestore.
 * @param {string} userUid The user's UID.
 * @param {number} requestedState Set vote state.
 * @param {string} commentId The comment ID.
 * @return {Promise<void>} Returns a void promise.
 */
export default async function questionCommentVote(
  questionId: string,
  userUid: string,
  requestedState: number,
  commentId: string
): Promise<void> {
  console.log(questionId, userUid, requestedState, commentId);
  const questionDoc = db.collection("questions").doc(questionId);
  const userDoc = await questionDoc
    .collection("questionComments")
    .doc(commentId)
    .collection("votes")
    .doc(userUid)
    .get();
  const documentData = userDoc.data() as Votes;
  return new Promise<void>((resolve) => {
    // no vote or want to change vote
    if (documentData?.state != requestedState) {
      changeVote(
        requestedState,
        questionDoc,
        userUid,
        commentId,
        documentData?.state
      )
        .then(() => {
          resolve();
        })
        .catch(() => {
          throw new functions.https.HttpsError(
            "internal",
            "changing vote server error"
          );
        });
    }
  });
}
