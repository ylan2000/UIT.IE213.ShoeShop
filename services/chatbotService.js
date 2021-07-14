const request = require("request");

const homepageService = require("./homepageService");

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const SECONDARY_RECEIVER_ID = process.env.SECONDARY_RECEIVER_ID;
const PRIMARY_RECEIVER_ID = process.env.FACEBOOK_APP_ID;

let sendMessageOptions = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
      try {
        console.log("options=======================================================");
          //send text message
          let response1 = {
              "text": `Hi! Welcome to Sneaker City Shop!`
          };

          //send an image
          let response2 = {
            "text": `How can I help you?`
          };

          let response3 = {
              "text": "At any time, use the menu below to navigate through the features."
          };

          //send a quick reply
          let response4 = {
              "text": "What can I do to help you today?",
              "quick_replies": [
                  {
                      "content_type": "text",
                      "title": "Categories",
                      "payload": "CATEGORIES",
                  },
                  {
                      "content_type": "text",
                      "title": "Talk to an agent",
                      "payload": "TALK_AGENT",
                  },
                  {
                      "content_type": "text",
                      "title": "Bye",
                      "payload": "BYE",
                  }
              ]
          };

          await sendMessage(sender_psid, response1);
          await sendMessage(sender_psid, response2);
          await sendMessage(sender_psid, response3);
          await sendMessage(sender_psid, response4);
          resolve("done");
      } catch (e) {
          reject(e);
      }
  });
};

let requestTalkToAgent = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
      try {
          //send a text message
          let response1 = {
              "text": "Ok. Someone real will be with you in a few minutes ^^"
          };

          await sendMessage(sender_psid, response1);

          //change this conversation to page inbox
          let app = "page_inbox"
          await passThreadControl(sender_psid, app);
          resolve("done");
      } catch (e) {
          reject(e);
      }
  });
};

let passThreadControl = (sender_psid, app) => {
  return new Promise((resolve, reject) => {
      try {
          let target_app_id = "";
          let metadata = "";

          if(app === "page_inbox"){
              target_app_id = SECONDARY_RECEIVER_ID;
              metadata = "Pass thread control to inbox chat";
          }
          if(app === "primary"){
              target_app_id = PRIMARY_RECEIVER_ID;
              metadata = "Pass thread control to the bot, primary app";
          }
          // Construct the message body
          let request_body = {
              "recipient": {
                  "id": sender_psid
              },
              "target_app_id": target_app_id,
              "metadata": metadata
          };

          // Send the HTTP request to the Messenger Platform
          request({
              "uri": "https://graph.facebook.com/v6.0/me/pass_thread_control",
              "qs": { "access_token": PAGE_ACCESS_TOKEN },
              "method": "POST",
              "json": request_body
          }, (err, res, body) => {
              console.log(body)
              if (!err) {
                  resolve('message sent!')
              } else {
                  reject("Unable to send message:" + err);
              }
          });
      } catch (e) {
          reject(e);
      }
  });
};

let sendMessage = (sender_psid, response) => {
  return new Promise(async (resolve, reject) => {
      try {
          await homepageService.markMessageRead(sender_psid);
          await homepageService.sendTypingOn(sender_psid);

          // Construct the message body
          let request_body = {
              "recipient": {
                  "id": sender_psid
              },
              "message": response
          };

          console.log(JSON.stringify(request_body) + "=====================");

          // Send the HTTP request to the Messenger Platform
          request({
            "uri": "https://graph.facebook.com/v6.0/me/messages",
            "qs": { "access_token": process.env.FB_PAGE_TOKEN },
            "method": "POST",
            "json": request_body
          }, (err, res, body) => {
            if (!err) {
              console.log('message sent!');
              console.log(`My messenger: ${response}`);
            } else {
              console.error("Unable to send message:" + err);
            }
          }); 
      } catch (e) {
          reject(e);
      }
  });
};

module.exports = {
  sendMessageOptions: sendMessageOptions,
  requestTalkToAgent: requestTalkToAgent,
  sendMessage: sendMessage
};
