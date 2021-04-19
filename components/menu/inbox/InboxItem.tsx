import React from "react";
import styles from "../../../styles/menu/inbox/InboxItem.module.css";
import firebase from "firebase/app";
import "firebase/firestore";
import { useAuth } from "../../../utils/use-auth";
import { useRouter } from "next/router";
import Moment from "react-moment";

const db = firebase.firestore();

interface InboxItemProps {
  type: "comment" | "answer";
  preview: string;
  questionTitle: string;
  timestamp: FirestoreDate;
  inboxItemId: string;
  read: Boolean;
  questionId: string;
  closeWindow: () => void;
  commentId?: string;
  answerId?: string;
}

export default function InboxItem({
  type,
  preview,
  questionTitle,
  timestamp,
  questionId,
  answerId,
  commentId,
  read,
  inboxItemId,
  closeWindow,
}: InboxItemProps) {
  const auth = useAuth();
  const router = useRouter();

  const goToQuestion = () => {
    router.push(`/question/${questionId}`);
    closeWindow();
    db.collection("users")
      .doc(auth.user.uid)
      .collection("inbox")
      .doc(inboxItemId)
      .update({
        read: true,
      });
  };

  return (
    <div
      className={styles.inboxItem}
      style={{ backgroundColor: read ? "" : "rgba(255, 244, 99, 0.25)" }}
    >
      <div className={styles.type}>
        {type}
        <div className={styles.timestamp}>
          <Moment date={timestamp.toDate()} fromNow />
        </div>
      </div>
      <div className={styles.title}>
        <a onClick={goToQuestion}>{questionTitle}</a>
      </div>

      <div className={styles.preview}>{preview}</div>
    </div>
  );
}
