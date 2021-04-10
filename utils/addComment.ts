import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore();

export default function addComment(
  questionId: string,
  to: "questionComment" | "answerComment",
  answerId?: string
) {
  const postDoc = db.collection("questions").doc(questionId);

  switch (to) {
    case "questionComment":
      return postDoc.collection("questionComments");
    case "answerComment":
      return postDoc
        .collection("answers")
        .doc(answerId)
        .collection("answerComments");
  }
}
