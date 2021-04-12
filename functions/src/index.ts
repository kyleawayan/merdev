/* eslint-disable object-curly-spacing */
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp(functions.config().firebase);

import { updateVoteCounter } from "./vote/voteCounter";
import { updateAnswerCounter } from "./answer/answerCounter";
import { markSolved } from "./answer/markSolved";

exports.updateVoteCounter = updateVoteCounter;
exports.updateAnswerCounter = updateAnswerCounter;
exports.markSolved = markSolved;
