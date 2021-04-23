import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
const db = admin.firestore();

export const addDisplayNameToDb = functions.auth.user().onCreate((user) => {
  // https://stackoverflow.com/questions/44645349/cloud-functions-for-firebase-auth-user-api-has-empty-displayname-property
  return admin
    .auth()
    .getUser(user.uid)
    .then(async (userRecord) => {
      if (userRecord.displayName) {
        const displayName = userRecord.displayName;
        const userUid = user.uid;
        const userDoc = await db
          .collection("displayNames")
          .doc(displayName)
          .get();
        if (!userDoc.exists) {
          return db.collection("displayNames").doc(displayName).set({
            userUid: userUid,
          });
        } else {
          throw new functions.https.HttpsError(
            "unavailable",
            `Duplicate display name was registered: ${displayName} with UID ${userUid}`
          );
        }
      } else {
        throw new functions.https.HttpsError(
          "failed-precondition",
          "Display name is required."
        );
      }
    })
    .catch((error) => {
      throw new functions.https.HttpsError("internal", error);
    });
});
