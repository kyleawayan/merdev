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
import { updateAnswerCounter } from "./answer/answerCounter";
import { markSolved } from "./answer/markSolved";

exports.updateQuestionVoteCounter = updateQuestionVoteCounter;
exports.updateAnswerVoteCounter = updateAnswerVoteCounter;
exports.updateQuestionCommentVoteCounter = updateQuestionCommentVoteCounter;
exports.updateAnswerCommentVoteCounter = updateAnswerCommentVoteCounter;
exports.updateAnswerCounter = updateAnswerCounter;
exports.markSolved = markSolved;
