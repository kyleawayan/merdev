import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";
import Question from "../../components/questionViewer/question/Question";
import Answers from "../../components/questionViewer/answers/Answers";

const db = firebase.firestore();

export default function QuestionViewer() {
  const [data, setData] = useState<Question>();
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      const unsubscribe = db
        .collection("questions")
        .doc(router.query.id as string)
        .onSnapshot((snapshot) => {
          const dataWithId = {
            ...(snapshot.data() as Question),
            id: router.query.id as string,
          };
          setData(dataWithId);
        });
      return () => unsubscribe();
    }
  }, [router.query.id]);

  if (!data) {
    return <div className="globalContainer">loading</div>;
  }

  return (
    <div className="globalContainer">
      <Question data={data} />
      <Answers questionId={data.id} questionUserUid={data.author.userUid} />
    </div>
  );
}
