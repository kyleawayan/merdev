import React, { useState } from "react";
import styles from "../../styles/ask/QuestionMakerEditor.module.css";
import { useAuth } from "../../utils/use-auth";
import MarkdownEditor from "./MarkdownEditor";
import firebase from "firebase/app";
import "firebase/firestore";

export default function QuestionMakerEditor() {
  const auth = useAuth();
  const db = firebase.firestore();
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const titleChange = (event: {
    target: { value: React.SetStateAction<string> }; // this type isn't right, change it later
  }) => {
    setTitle(event.target.value);
  };

  const submitQuestion = () => {
    console.log(btoa(value));
    db.collection("questions").add({
      title: title,
      tags: ["tag", "another tag", "another tag"],
      userUid: auth.user.uid,
      timestamp: new Date(),
      markdown: btoa(value),
      counters: {
        votes: 0,
        answers: 0,
        views: 0,
      },
    });
  };

  return (
    <div className={styles.questionMakerEditor}>
      <div className={styles.questionTitleInput}>
        <input
          placeholder="enter question title here"
          value={title}
          onChange={titleChange}
        />
      </div>
      <MarkdownEditor value={value} onChange={setValue} />
      <button onClick={submitQuestion}>submit question</button>
    </div>
  );
}
