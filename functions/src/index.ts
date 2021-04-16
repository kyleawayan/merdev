/* eslint-disable object-curly-spacing */
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp(functions.config().firebase);

import {
  updateQuestionVoteCounter,
  updateAnswerVoteCounter,
  updateQuestionCommentVoteCounter,
  updateAnswerCommentVoteCounter,
} from "./vote/voteCounter";
import {
  updateAnswerCounterOnCreate,
  updateAnswerCounterOnDelete,
} from "./answer/answerCounter";
import { markSolved } from "./answer/markSolved";

exports.updateQuestionVoteCounter = updateQuestionVoteCounter;
exports.updateAnswerVoteCounter = updateAnswerVoteCounter;
exports.updateQuestionCommentVoteCounter = updateQuestionCommentVoteCounter;
exports.updateAnswerCommentVoteCounter = updateAnswerCommentVoteCounter;
exports.updateAnswerCounterOnUpdate = updateAnswerCounterOnCreate;
exports.updateAnswerCounterOnDelete = updateAnswerCounterOnDelete;
exports.markSolved = markSolved;
