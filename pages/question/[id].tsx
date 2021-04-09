import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";
import Intro from "../../components/questionViewer/Intro";
import Upvoter from "../../components/questionViewer/upvoter/Upvoter";
import styles from "../../styles/questionViewer/QuestionViewer.module.css";
import Text from "../../components/questionViewer/Text";

export default function QuestionViewer() {
  const db = firebase.firestore();
  const [data, setData] = useState<Question>();
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      const unsubscribe = db
        .collection("questions")
        .doc(router.query.id as string)
        .onSnapshot((snapshot) => {
          setData(snapshot.data() as Question);
        });
      return () => unsubscribe();
    }
  }, [router.query.id]);

  console.log(data);

  if (!data) {
    return <div className="globalContainer">loading</div>;
  }

  return (
    <div className="globalContainer">
      <Intro
        title={data.title}
        tags={data.tags}
        askedDate={data.timestamp}
        viewed={data.counters.views}
      />
      <div className={styles.text}>
        <Upvoter postId={data.id} />
        <div className={styles.markdown}>
          <Text value={atob(data.markdown)} />
        </div>
      </div>
    </div>
  );
}
