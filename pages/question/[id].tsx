import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";
import Question from "../../components/questionViewer/question/Question";
import Answers from "../../components/questionViewer/answers/Answers";
import QuestionPreload from "../../components/questionViewer/question/preload/QuestionPreload";

interface RichData {
  title: string;
  markdown: string;
  datePosted: string;
  tags: Array<string>;
  votes: number;
}

const db = firebase.firestore();

export default function QuestionViewer({
  title,
  markdown,
  datePosted,
  tags,
  votes,
}: RichData) {
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

  const description =
    markdown.substring(0, 52) + `${markdown.length > 52 ? "..." : ""}` ?? "";

  const RichQuestionInfo = () => {
    const imageUrl = `https://merdev-og-image-kyleawayan.vercel.app/${encodeURI(
      title
    )}`;
    return (
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="merdev" />
        <meta name="twitter:image:src" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
      </Head>
    );
  };

  if (!data) {
    return (
      <div className="globalContainer">
        <RichQuestionInfo />
        <QuestionPreload
          title={title}
          tags={tags}
          datePosted={new Date(datePosted)}
          markdown={markdown}
          votes={votes}
        />
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
  // does not work with emulator
  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_PROJECTID}/databases/(default)/documents/questions/${context.query.id}`
  );
  const json = await res.json();
  const questionData: QuestionFromRESTAPI = json.fields;

  // everything is optional below
  // becasue context.query.id is sometimes "noflash.js"
  // instead of the question id
  const title = questionData?.title.stringValue ?? "";
  const markdown = questionData?.markdown.stringValue ?? "";
  const datePosted = questionData?.timestamp.timestampValue ?? "";
  const tags =
    questionData?.tags.arrayValue.values.map((tag) => tag.stringValue) ?? [];
  const votes = questionData?.counters.mapValue.fields.votes.integerValue ?? 0;

  return {
    props: {
      title,
      markdown,
      datePosted,
      tags,
      votes,
    },
  };
};
