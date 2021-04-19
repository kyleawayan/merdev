import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
const db = admin.firestore();

export const clearInbox = functions.https.onCall((_, context) => {
  const userUid = context.auth?.uid;
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in."
    );
  }
  const collectionRef = db.collection(`/users/${userUid}/inbox`);
  const query = collectionRef.orderBy("__name__").limit(10);

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore idk why the "resolve" is expecting an argument
    deleteQueryBatch(query, resolve).catch(reject);
  });
});

async function deleteQueryBatch(
  query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>,
  resolve: () => void
) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(query, resolve);
  });
}
