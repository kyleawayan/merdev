import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QuestionMakerEditor from "../components/ask/QuestionMakerEditor";
import { questionDoc, answerDoc } from "../utils/postDocs";

export default function Edit() {
  const router = useRouter();
  const [data, setData] = useState<Question | Answer>();

  const questionId = router.query.questionId as string;
  const answerId = router.query?.answerId as string;

  useEffect(() => {
    if (questionId && !answerId) {
      questionDoc(questionId)
        .get()
        .then((doc) => setData(doc.data() as Question))
        .catch(console.error);
    } else if (questionId && answerId) {
      answerDoc(questionId, answerId)
        .get()
        .then((doc) => setData(doc.data() as Answer))
        .catch(console.error);
    }
  });

  if (!data) {
    return <div className="globalContainer">Loading...</div>;
  }

  return (
    <div className="globalContainer">
      <QuestionMakerEditor
        defaultTitle={"title" in data ? data.title : ""}
        defaultValue={data.markdown}
        questionId={questionId}
        answerId={answerId}
        showTitle={"title" in data}
      />
    </div>
  );
}
