import React, { useEffect, useState } from "react";
import DownArrow from "./DownArrow";
import UpArrow from "./UpArrow";
import styles from "../../../styles/questionViewer/upvoter/Upvoter.module.css";
import firebase from "firebase/app";
import { checkAnswerVote, checkQuestionVote } from "../../../utils/checkVote";
import { useAuth } from "../../../utils/use-auth";

const vote = firebase.functions().httpsCallable("votes");

interface UpvoterProps {
  questionId: string;
  answerId?: string;
  type: "question" | "answer";
  votes: number;
}

export default function Upvoter({
  questionId,
  answerId,
  type,
  votes,
}: UpvoterProps) {
  const auth = useAuth();
  const [offset, setOffset] = useState(0);
  const [voteState, setVoteState] = useState(0);

  const upvote = () => {
    setOffset(1);
    setVoteState(1);
    vote({
      questionId: questionId,
      answerId: answerId,
      action: type == "question" ? 0 : 1,
      setState: 1,
    });
  };

  const downvote = () => {
    setOffset(-1);
    setVoteState(-1);
    vote({
      questionId: questionId,
      answerId: answerId,
      action: type == "question" ? 0 : 1,
      setState: -1,
    });
  };

  useEffect(() => {
    const userUid = auth.user.uid;
    if (type == "question") {
      checkQuestionVote(questionId, userUid).then((doc) => {
        setVoteState(doc.data()?.state ?? 0);
      });
    } else if (answerId) {
      checkAnswerVote(questionId, userUid, answerId).then((doc) => {
        setVoteState(doc.data()?.state ?? 0);
      });
    }
  }, [votes]);

  useEffect(() => {
    setOffset(0);
  }, [votes]);

  return (
    <div className={styles.voter}>
      <div>
        <UpArrow onClick={upvote} highlighted={voteState == 1} />
      </div>
      <div className={styles.voteNumber}>{votes + offset}</div>
      <div>
        <DownArrow onClick={downvote} highlighted={voteState == -1} />
      </div>
    </div>
  );
}
