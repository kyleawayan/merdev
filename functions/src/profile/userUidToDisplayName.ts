import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

// to do: get rid of this function and use the existing displayName db collection
export const userUidToDisplayName = functions.https.onRequest((req, res) => {
  const requestedUserUid = req.query.userUid as string;
  if (!requestedUserUid) {
    res.status(400).send({
      status: "error",
      message: "No user UID was supplied.",
    });
    return;
  }
  admin
    .auth()
    .getUser(requestedUserUid)
    .then((data) => {
      res.status(200).send({
        status: "success",
        userUid: requestedUserUid,
        displayName: data.displayName,
      });
    })
    .catch(() => {
      // to do: change error message based off actual error
      res.status(404).send({
        status: "error",
        message: "User was not found.",
      });
    });
});
