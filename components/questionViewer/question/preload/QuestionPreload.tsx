import React from "react";
import Intro from "../Intro";
import styles from "../../../../styles/questionViewer/question/QuestionViewer.module.css";
import Text from "../../Text";
import LoadingUpvoterQuestion from "../../upvoter/preload/LoadingUpvoterQuestion";

interface QuestionPreloadProps {
  title: string;
  tags: Array<string>;
  datePosted: Date;
  markdown: string;
  votes: number;
}

export default function QuestionPreload({
  title,
  tags,
  datePosted,
  markdown,
  votes,
}: QuestionPreloadProps) {
  return (
    <div className={styles.question}>
      <Intro title={title} tags={tags} askedDate={datePosted} viewed={0} />
      <div className={styles.text}>
        <LoadingUpvoterQuestion votes={votes} />
        <div className={styles.markdown}>
          <Text value={markdown} />
          <div className={styles.userCard}></div>
          <div className={styles.controls}></div>
        </div>
      </div>
    </div>
  );
}
