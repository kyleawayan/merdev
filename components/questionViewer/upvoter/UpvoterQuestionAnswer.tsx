import React, { useEffect, useState } from "react";
import DownArrow from "./DownArrow";
import UpArrow from "./UpArrow";
import styles from "../../../styles/questionViewer/upvoter/Upvoter.module.css";
import { useAuth } from "../../../utils/use-auth";
import {
  clearVote,
  downvote,
  upvote,
} from "../../../utils/vote/updateQuestionOrAnswerVote";
import { questionVoteDoc, answerVoteDoc } from "./../../../utils/vote/voteDocs";
import throttle from "lodash.throttle";

const voteThrottle = throttle(
  (requestedState, questionId, userUid, type, answerId) => {
    console.log("upvoted");
    switch (requestedState) {
      case -1:
        downvote(questionId, userUid, type, answerId);
        break;
      case 0:
        clearVote(questionId, userUid, type, answerId);
        break;
      case 1:
        upvote(questionId, userUid, type, answerId);
        break;
    }
  },
  1000,
  { trailing: false }
);

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
  const [voteState, setVoteState] = useState(0);
  const [buffer, setBuffer] = useState(0);
  const userUid = auth.user.uid;

  const upvotePress = () => {
    if (voteState != 1) {
      setBuffer(1 - voteState);
      voteThrottle(1, questionId, userUid, type, answerId);
    } else {
      setBuffer(0);
      voteThrottle(0, questionId, userUid, type, answerId);
    }
  };

  const downvotePress = () => {
    if (voteState != -1) {
      setBuffer(-1 - voteState);
      voteThrottle(-1, questionId, userUid, type, answerId);
    } else {
      setBuffer(0);
      voteThrottle(0, questionId, userUid, type, answerId);
    }
  };

  useEffect(() => {
    const userUid = auth.user.uid;
    if (type == "question") {
      questionVoteDoc(questionId, userUid).onSnapshot((snapshot) => {
        setVoteState(snapshot.data()?.state ?? 0);
      });
    } else if (answerId) {
      answerVoteDoc(questionId, userUid, answerId).onSnapshot((snapshot) => {
        setVoteState(snapshot.data()?.state ?? 0);
      });
    }
  });

  useEffect(() => {
    setBuffer(0);
  }, [votes]);

  return (
    <div className={styles.voter}>
      <div>
        <UpArrow onClick={upvotePress} highlighted={voteState == 1} />
      </div>
      <div className={styles.voteNumber}>{votes + buffer}</div>
      <div>
        <DownArrow onClick={downvotePress} highlighted={voteState == -1} />
      </div>
    </div>
  );
}
