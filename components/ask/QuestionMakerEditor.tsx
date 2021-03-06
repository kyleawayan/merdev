import React, { useState } from "react";
import styles from "../../styles/ask/QuestionMakerEditor.module.css";
import { useAuth } from "../../utils/use-auth";
import MarkdownEditor from "./MarkdownEditor";
import firebase from "firebase/app";
import "firebase/firestore";
import { useRouter } from "next/router";
import { questionDoc, answerDoc } from "../../utils/postDocs";
import TagsField from "./TagsField";
// import useNavigationLock from "../../utils/useNavigationLock";

const db = firebase.firestore();

interface QuestionMakerProps {
  // used for editing questions and answers after
  defaultTitle?: string;
  defaultValue?: string;
  questionId?: string;
  answerId?: string;
  showTitle?: boolean;
  tags?: Array<string>;
}

export default function QuestionMakerEditor({
  defaultTitle,
  defaultValue,
  questionId,
  answerId,
  showTitle = true,
  tags,
}: QuestionMakerProps) {
  const auth = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState(defaultTitle ?? "");
  const [value, setValue] = useState(defaultValue ?? "");
  const [tagField, setTagField] = useState(tags?.join(",") ?? "");

  // if (title || value || tagField) {
  //   useNavigationLock(true);
  // } else {
  //   useNavigationLock(false);
  // }

  const titleChange = (event: {
    target: { value: React.SetStateAction<string> }; // this type isn't right, change it later
  }) => {
    setTitle(event.target.value);
  };

  const submitQuestion = () => {
    if (!defaultValue) {
      db.collection("questions")
        .add({
          title: title,
          tags: tagField.split(","),
          author: {
            userUid: auth.user.uid,
            displayName: auth.user.displayName,
          },
          timestamp: new Date(),
          markdown: value,
          counters: {
            votes: 0,
            answers: 0,
            views: 0,
          },
        })
        .then(() => router.push("/"));
    } else {
      // editing a question or answer
      if (questionId && !answerId) {
        questionDoc(questionId).update({
          title: title,
          markdown: value,
          edited: new Date(),
        });
      } else if (questionId && answerId) {
        answerDoc(questionId, answerId).update({
          title: title,
          markdown: value,
          edited: new Date(),
        });
      }
      router.replace(`/question/${questionId}`);
    }
  };

  const onTagFieldChange = (event: any, { newValue }: { newValue: string }) => {
    setTagField(newValue);
  };

  return (
    <div
      className={styles.questionMakerEditor}
      style={{ backgroundImage: "/" }}
    >
      {showTitle && (
        <div className={styles.questionTitleInput}>
          <input
            placeholder="Enter question title here"
            value={title}
            onChange={titleChange}
          />
        </div>
      )}
      <div>
        {showTitle && (
          <TagsField value={tagField} onChange={onTagFieldChange} />
        )}
      </div>
      <div className={styles.editor}>
        <MarkdownEditor value={value} onChange={setValue} />
      </div>
      <button onClick={submitQuestion}>
        {!defaultValue ? "Submit Question" : "Submit Edit"}
      </button>
    </div>
  );
}
