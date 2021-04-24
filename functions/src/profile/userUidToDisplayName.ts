import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

// to do: get rid of this function and use the existing displayName db collection
export const userUidToDisplayName = functions.https.onRequest(
  async (req, res) => {
    const requestedUserUid = req.query.userUid as string;

    if (!requestedUserUid) {
      res.status(400).send({
        status: "error",
        message: "No user UID was supplied.",
      });
      return;
    }

    const todaysDate = new Date();

    let pfpUrl = "";

    const storageRef = admin
      .storage()
      .bucket()
      .file(`avatars/${requestedUserUid}.jpg`);

    const userHasPfp = await storageRef.exists(); // this is given in an array of booleans

    if (userHasPfp[0]) {
      pfpUrl = (
        await storageRef.getSignedUrl({
          action: "read",
          expires: todaysDate.setHours(todaysDate.getHours() + 1),
        })
      )[0]; // signed urls are also given in an array
    }

    admin
      .auth()
      .getUser(requestedUserUid)
      .then((data) => {
        res.status(200).send({
          status: "success",
          userUid: requestedUserUid,
          displayName: data.displayName,
          pfpUrl: pfpUrl,
        });
      })
      .catch(() => {
        // to do: change error message based off actual error
        res.status(404).send({
          status: "error",
          message: "User was not found.",
        });
      });
  }
);
