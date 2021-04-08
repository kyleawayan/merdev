import firebase from "firebase/app";
import "firebase/functions";

const userUidToUsernameRequest = firebase
  .functions()
  .httpsCallable("userUidToUsername");

export default function userUidToDisplayName(userUid: string) {
  return userUidToUsernameRequest({ userUid: userUid });
  // this is basically just a request to the
  // backend api to convert a user id into a display name
  // i'll prolly do this another way though, it seems really slow
}
