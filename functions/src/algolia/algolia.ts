import * as functions from "firebase-functions";

import algoliasearch from "algoliasearch";

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;

const ALGOLIA_INDEX_NAME = "questions";
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

export const onQuestionCreate = functions.firestore
  .document("questions/{questionId}")
  .onCreate((snap, context) => {
    const question = snap.data();

    question.objectID = context.params.questionId;

    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(question);
  });

export const onQuestionEdit = functions.firestore
  .document("questions/{questionId}")
  .onUpdate((change, context) => {
    const question = change.after.data();

    question.objectID = context.params.questionId;

    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(question);
  });

export const onAnswerCreate = functions.firestore
  .document("questions/{questionId}/answers/{answerId}")
  .onCreate((snap, context) => {
    const question = snap.data();

    question.objectID = context.params.answerId;

    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject({
      ...question,
      questionId: context.params.questionId,
    });
  });

export const onAnswerUpdate = functions.firestore
  .document("questions/{questionId}/answers/{answerId}")
  .onUpdate((change, context) => {
    const question = change.after.data();

    question.objectID = context.params.answerId;

    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject({
      ...question,
      questionId: context.params.questionId,
    });
  });
