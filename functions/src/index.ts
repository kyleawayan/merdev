/* eslint-disable object-curly-spacing */
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp(functions.config().firebase);

// import { vote } from "./vote/vote";
import { updateAnswerCounter } from "./answer/answerCounter";
import { markSolved } from "./answer/markSolved";

// exports.votes = vote;
exports.updateAnswerCounter = updateAnswerCounter;
exports.markSolved = markSolved;
