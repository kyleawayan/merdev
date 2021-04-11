import React, { useEffect, useState } from "react";
import DownArrow from "./DownArrow";
import UpArrow from "./UpArrow";
import styles from "../../../styles/questionViewer/upvoter/UpvoterComment.module.css";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  checkAnswerCommentVote,
  checkAnswerVote,
  checkQuestionCommentVote,
  checkQuestionVote,
} from "../../../utils/checkVote";
import { useAuth } from "../../../utils/use-auth";

const vote = firebase.functions().httpsCallable("votes");

interface UpvoterProps {
  questionId: string;
  commentId: string;
  answerId?: string;
  votes: number;
  on: "question" | "answer";
}

export default function UpvoterComment({
  questionId,
  commentId,
  answerId,
  votes,
  on,
}: UpvoterProps) {
  const auth = useAuth();
  const [offset, setOffset] = useState(0);
  const [voteState, setVoteState] = useState(0);

  const upvote = () => {
    setOffset(1);
    setVoteState(1);
    vote({
      questionId: questionId,
      commentId: commentId,
      answerId: answerId,
      action: on == "question" ? 2 : 3,
      setState: 1,
    });
  };

  const downvote = () => {
    setOffset(-1);
    setVoteState(-1);
    vote({
      questionId: questionId,
      commentId: commentId,
      answerId: answerId,
      action: on == "question" ? 2 : 3,
      setState: -1,
    });
  };

  useEffect(() => {
    const userUid = auth.user.uid;
    if (on == "question") {
      checkQuestionCommentVote(questionId, userUid, commentId).then((doc) => {
        setVoteState(doc.data()?.state ?? 0);
      });
    } else if (answerId) {
      checkAnswerCommentVote(questionId, userUid, answerId, commentId).then(
        (doc) => {
          setVoteState(doc.data()?.state ?? 0);
        }
      );
    }
  }, [votes]);

  useEffect(() => {
    setOffset(0);
  }, [votes]);

  return (
    <div className={styles.voter}>
      <span>
        <UpArrow width={18} onClick={upvote} highlighted={voteState == 1} />
      </span>
      <span className={styles.voteNumber}>{votes + offset}</span>
      <span>
        <DownArrow
          width={18}
          onClick={downvote}
          highlighted={voteState == -1}
        />
      </span>
    </div>
  );
}
