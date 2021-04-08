import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

export const userUidToUsername = functions.https.onCall((data) => {
  return new Promise((resolve) => {
    const userUid = data.userUid;
    if (userUid) {
      admin
        .auth()
        .getUser(userUid)
        .then((user) => {
          resolve({
            userUid: userUid,
            displayName: user.displayName,
          });
        })
        .catch(() => {
          throw new functions.https.HttpsError("not-found", "user not found");
        });
    } else {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "invalid request"
      );
    }
  });
});
