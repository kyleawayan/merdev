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
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [voteState, setVoteState] = useState(0);
  const [buffer, setBuffer] = useState(0);
  const userUid = auth.user.uid;

  const voteThrottle = throttle(
    (requestedState) => {
      if (auth.user) {
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
      } else {
        router.push("/signup");
      }
    },
    1000,
    { trailing: false }
  );

  const upvotePress = () => {
    if (voteState != 1) {
      setBuffer(1);
      voteThrottle(1);
    } else {
      setBuffer(0);
      voteThrottle(0);
    }
  };

  const downvotePress = () => {
    if (voteState != -1) {
      setBuffer(-1 - voteState);
      voteThrottle(-1);
    } else {
      setBuffer(0);
      voteThrottle(0);
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
