import React, { useState } from "react";
import styles from "../../../styles/questionViewer/comments/AddComment.module.css";
import addComment from "../../../utils/addComment";
import { useAuth } from "../../../utils/use-auth";
import CommentEditor from "./CommentEditor";

interface AddCommentProps {
  id: string;
  to: "questionComment" | "answerComment";
  answerId?: string;
}

export default function AddComment({ id, to, answerId }: AddCommentProps) {
  const auth = useAuth();
  const [editorOpen, setEditorOpen] = useState(false);
  const [value, setValue] = useState("");

  const submitComment = () => {
    addComment(id, to, answerId)
      .add({
        userUid: auth.user.uid,
        displayName: auth.user.displayName,
        markdown: value,
        timestamp: new Date(),
        counters: {
          votes: 0,
        },
      })
      .then(() => {
        setEditorOpen(false);
        setValue("");
      });
  };

  return (
    <div className={styles.addComment}>
      <div onClick={() => setEditorOpen(!editorOpen)}>Add comment</div>
      {editorOpen && (
        <div>
          <div className={styles.editor}>
            <CommentEditor value={value} onChange={setValue} />
          </div>
          <div className={styles.buttons}>
            <button onClick={() => setEditorOpen(false)}>cancel</button>
            <button onClick={submitComment}>submit</button>
          </div>
        </div>
      )}
    </div>
  );
}
