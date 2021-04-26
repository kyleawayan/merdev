import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

let webhookUrl = "";

if (process.env.FUNCTIONS_EMULATOR != "true") {
  webhookUrl = functions.config().discordwebhook.url;
}

export const discordWebhook = functions.firestore
  .document("questions/{questionId}")
  .onCreate(async (snap) => {
    const questionData = snap.data() as Question;
    const questionId = snap.id;

    const webhookId = webhookUrl.split("/")[5];
    const webhookToken = webhookUrl.split("/")[6];

    const todaysDate = new Date();

    let pfpUrl = "";

    try {
      const storageRef = admin
        .storage()
        .bucket()
        .file(`avatars/${questionData.author.userUid}.jpg`);

      const userHasPfp = await storageRef.exists(); // this is given in an array of booleans

      if (userHasPfp[0]) {
        pfpUrl = (
          await storageRef.getSignedUrl({
            action: "read",
            expires: todaysDate.setFullYear(todaysDate.getFullYear() + 4),
          })
        )[0]; // signed urls are also given in an array
      }
    } catch (e) {
      console.error(e);
    }

    return axios({
      method: "post",
      url: `https://discord.com/api/webhooks/${webhookId}/${webhookToken}`,
      data: {
        embeds: [
          {
            title: questionData.title,
            description: questionData.tags.join(", "),
            url: `https://merdev.kylan.io/question/${questionId}`,
            author: {
              name: questionData.author.displayName,
              url: `https://merdev.kylan.io/profile/${questionData.author.userUid}`,
              icon_url: pfpUrl,
            },
            fields: [
              {
                name: "Question",
                value:
                  questionData.markdown.substring(0, 1021) +
                  `${questionData.markdown.length > 1021 ? "..." : ""}`,
              },
            ],
          },
        ],
      },
    });
  });
