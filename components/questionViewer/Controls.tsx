import React from "react";
import styles from "../../styles/questionViewer/Controls.module.css";
import { useAuth } from "../../utils/use-auth";
import { questionDoc, answerDoc } from "../../utils/postDocs";
import { useRouter } from "next/router";

interface ControlsProps {
  postUserUid: string;
  on: "question" | "answer";
  questionId: string;
  answerId?: string;
}

export default function Controls({
  postUserUid,
  on,
  questionId,
  answerId,
}: ControlsProps) {
  const auth = useAuth();
  const router = useRouter();

  const deletePost = () => {
    let confirm = window.confirm(`Are you sure you want to delete this ${on}?`);
    if (confirm) {
      if (on == "question") {
        questionDoc(questionId).delete().catch(console.error);
        router.push("/");
      } else if (on == "answer" && answerId) {
        answerDoc(questionId, answerId).delete().catch(console.error);
      }
    }
  };

  const editPost = () => {
    if (on == "question") {
      router.push(`/edit?questionId=${questionId}`);
    } else if (on == "answer" && answerId) {
      router.push(`/edit?questionId=${questionId}&answerId=${answerId}`);
    }
  };

  return (
    <div className={styles.controls}>
      <span>Share</span>
      {postUserUid == auth.user.uid && <span onClick={editPost}>Edit</span>}
      {postUserUid == auth.user.uid && <span onClick={deletePost}>Delete</span>}
    </div>
  );
}
