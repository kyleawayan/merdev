import React, { useEffect, useState } from "react";
import DownArrow from "./DownArrow";
import UpArrow from "./UpArrow";
import styles from "../../../styles/questionViewer/upvoter/UpvoterComment.module.css";
import { useAuth } from "../../../utils/use-auth";
import {
  clearVote,
  downvote,
  upvote,
} from "../../../utils/vote/updateCommentVote";
import {
  answerCommentVoteDoc,
  questionCommentVoteDoc,
} from "../../../utils/vote/voteDocs";
import throttle from "lodash.throttle";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [voteState, setVoteState] = useState(0);
  const [buffer, setBuffer] = useState(0);
  const userUid = auth.user.uid;

  const voteThrottle = throttle(
    (requestedState) => {
      if (auth.user) {
        switch (requestedState) {
          case -1:
            downvote(questionId, userUid, commentId, on, answerId);
            break;
          case 0:
            clearVote(questionId, userUid, commentId, on, answerId);
            break;
          case 1:
            upvote(questionId, userUid, commentId, on, answerId);
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
      setBuffer(1 - voteState);
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
    setBuffer(0);
  }, [votes]);

  useEffect(() => {
    const userUid = auth.user.uid;
    if (on == "question") {
      questionCommentVoteDoc(questionId, userUid, commentId).onSnapshot(
        (snapshot) => {
          setVoteState(snapshot.data()?.state ?? 0);
        }
      );
    } else if (answerId) {
      answerCommentVoteDoc(questionId, userUid, answerId, commentId).onSnapshot(
        (snapshot) => {
          setVoteState(snapshot.data()?.state ?? 0);
        }
      );
    }
  });

  return (
    <div className={styles.voter}>
      <span>
        <UpArrow
          width={18}
          onClick={upvotePress}
          highlighted={voteState == 1}
        />
      </span>
      <span className={styles.voteNumber}>{votes + buffer}</span>
      <span>
        <DownArrow
          width={18}
          onClick={downvotePress}
          highlighted={voteState == -1}
        />
      </span>
    </div>
  );
}
