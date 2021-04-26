import * as functions from "firebase-functions";
import axios from "axios";

// let webhookUrl = "";

// if (process.env.FUNCTIONS_EMULATOR != "true") {
//   webhookUrl = functions.config().discordWebhook.url;
// }

export const onQuestionCreate = functions.firestore
  .document("questions/{questionId}")
  .onCreate((snap, context) => {
    const initDiscordHookResponse = axios({
      method: "get",
      url:
        "https://discord.com/api/webhooks/836049320956264458/kGKN8DIxa-_FPiNczdjBVVfvdyyTg9Sjt6NmfNSVKjo1fXlA6W2HAyC5kW0d6cijwVvn",
    }).then((response) => response.data);

    console.log(initDiscordHookResponse);

    return 0;
  });
