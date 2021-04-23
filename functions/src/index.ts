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
import {
  addAnswerCommentToInbox,
  addAnswerReplyToInbox,
  addQuestionCommentReplyToInbox,
} from "./inbox/addReplyToInbox";
import { clearInbox } from "./inbox/clearInbox";
import { userUidToDisplayName } from "./profile/userUidToDisplayName";
import {
  onQuestionCreate,
  onQuestionUpdate,
  onAnswerCreate,
  onAnswerUpdate,
  onQuestionDelete,
  onAnswerDelete,
} from "./algolia/algolia";
import { addDisplayNameToDb } from "./auth/addDisplayNameToDb";

exports.updateQuestionVoteCounter = updateQuestionVoteCounter;
exports.updateAnswerVoteCounter = updateAnswerVoteCounter;
exports.updateQuestionCommentVoteCounter = updateQuestionCommentVoteCounter;
exports.updateAnswerCommentVoteCounter = updateAnswerCommentVoteCounter;
exports.updateAnswerCounterOnUpdate = updateAnswerCounterOnCreate;
exports.updateAnswerCounterOnDelete = updateAnswerCounterOnDelete;
exports.markSolved = markSolved;
exports.addQuestionCommentReplyToInbox = addQuestionCommentReplyToInbox;
exports.addAnswerReplyToInbox = addAnswerReplyToInbox;
exports.addAnswerCommentToInbox = addAnswerCommentToInbox;
exports.clearInbox = clearInbox;
exports.userUidToDisplayName = userUidToDisplayName;
if (process.env.FUNCTIONS_EMULATOR != "true") {
  // algolia stuff
  exports.onQuestionCreate = onQuestionCreate;
  exports.onQuestionUpdate = onQuestionUpdate;
  exports.onQuestionDelete = onQuestionDelete;
  exports.onAnswerCreate = onAnswerCreate;
  exports.onAnswerUpdate = onAnswerUpdate;
  exports.onAnswerDelete = onAnswerDelete;
}
exports.addDisplayNameToDb = addDisplayNameToDb;
