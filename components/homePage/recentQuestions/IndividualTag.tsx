import React from "react";
import styles from "../../../styles/homePage/recentQuestions/IndividualTag.module.css";

interface TagProps {
  tag: string;
}

export default function IndividualTag({ tag }: TagProps) {
  return <span className={styles.tag}>{tag}</span>;
}
