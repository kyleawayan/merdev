import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";
import Question from "../../components/questionViewer/question/Question";
import Answers from "../../components/questionViewer/answers/Answers";

interface RichData {
  title: string;
  description: string;
}

const db = firebase.firestore();

export default function QuestionViewer({ title, description }: RichData) {
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

  const RichQuestionInfo = () => {
    return (
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta
          property="og:image"
          content={`https://merdev-og-image-kyleawayan.vercel.app/${encodeURI(
            title
          )}`}
        />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="merdev" />
      </Head>
    );
  };

  if (!data) {
    return (
      <div className="globalContainer">
        <RichQuestionInfo />
        Loading...
      </div>
    );
  }

  return (
    <div className="globalContainer">
      <RichQuestionInfo />
      <Question data={data} />
      <Answers questionId={data.id} questionUserUid={data.author.userUid} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_PROJECTID}/databases/(default)/documents/questions/${context.query.id}`
  );
  const json = await res.json();
  const questionData: QuestionFromRestApi = json.fields;

  // everything is optional below
  // becasue context.query.id is sometimes "noflash.js"
  // instead of the question id
  const title = questionData?.title.stringValue ?? "";
  const description =
    questionData?.markdown.stringValue.substring(0, 52) +
      `${questionData?.markdown.stringValue.length > 52 ? "..." : ""}` ?? "";

  return {
    props: {
      title,
      description,
    },
  };
};
