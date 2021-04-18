import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";
import Question from "../../components/questionViewer/question/Question";
import Answers from "../../components/questionViewer/answers/Answers";
import { GetServerSideProps } from "next";

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

  if (!data) {
    return <div className="globalContainer">loading</div>;
  }

  return (
    <div className="globalContainer">
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title: title,
          description: description,
          images: [
            {
              url: `https://merdev-og-image-kyleawayan.vercel.app/${encodeURI(
                title
              )}`,
              width: 1260,
              height: 720,
            },
          ],
          site_name: "merdev",
        }}
      />

      <Question data={data} />
      <Answers questionId={data.id} questionUserUid={data.author.userUid} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/merdev-7b539/databases/(default)/documents/questions/${context.query.id}`
  );
  const json = await res.json();
  const questionData: QuestionFromRestApi = json.fields;

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
