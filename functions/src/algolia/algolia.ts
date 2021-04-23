import * as functions from "firebase-functions";
import removeMd = require("remove-markdown");

import algoliasearch from "algoliasearch";

let ALGOLIA_ID = "";
let ALGOLIA_ADMIN_KEY = "";

if (process.env.FUNCTIONS_EMULATOR != "true") {
  ALGOLIA_ID = functions.config().algolia.app_id;
  ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
}

const ALGOLIA_INDEX_NAME = "questions";
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

export const onQuestionCreate = functions.firestore
  .document("questions/{questionId}")
  .onCreate((snap, context) => {
    const question = snap.data();

    question.objectID = context.params.questionId;
    const cleanText = removeMd(question.markdown);
    delete Object.assign(question, { ["text"]: question["markdown"] })[
      "markdown"
    ];
    question.text = cleanText;

    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(question);
  });

export const onQuestionUpdate = functions.firestore
  .document("questions/{questionId}")
  .onUpdate((change, context) => {
    const question = change.after.data();

    question.objectID = context.params.questionId;
    const cleanText = removeMd(question.markdown);
    delete Object.assign(question, { ["text"]: question["markdown"] })[
      "markdown"
    ];
    question.text = cleanText;

    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(question);
  });

export const onQuestionDelete = functions.firestore
  .document("questions/{questionId}")
  .onDelete((_, context) => {
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.deleteObject(context.params.questionId);
  });

export const onAnswerCreate = functions.firestore
  .document("questions/{questionId}/answers/{answerId}")
  .onCreate((snap, context) => {
    const answer = snap.data();

    answer.objectID = context.params.answerId;
    const cleanText = removeMd(answer.markdown);
    delete Object.assign(answer, { ["text"]: answer["markdown"] })["markdown"];
    answer.text = cleanText;

    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject({
      ...answer,
      questionId: context.params.questionId,
    });
  });

export const onAnswerUpdate = functions.firestore
  .document("questions/{questionId}/answers/{answerId}")
  .onUpdate((change, context) => {
    const answer = change.after.data();

    answer.objectID = context.params.answerId;
    const cleanText = removeMd(answer.markdown);
    delete Object.assign(answer, { ["text"]: answer["markdown"] })["markdown"];
    answer.text = cleanText;

    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject({
      ...answer,
      questionId: context.params.questionId,
    });
  });

export const onAnswerDelete = functions.firestore
  .document("questions/{questionId}/answers/{answerId}")
  .onDelete((_, context) => {
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.deleteObject(context.params.answerId);
  });
