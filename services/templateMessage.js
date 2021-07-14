let sendCategoriesTemplate = () =>{
  return {
      "attachment": {
          "type": "template",
          "payload": {
              "template_type": "generic",
              "elements": [
                  {
                      "title": "Vans",
                      "image_url": "https://i.postimg.cc/9fv7Jr7M/vans.jpg",
                      "default_action": {
                          "type": "web_url",
                          "url": "https://glacial-reef-79728.herokuapp.com/products/vans",
                          "webview_height_ratio": "tall",
                      },
                      "buttons": [
                          {
                              "type": "web_url",
                              "url": "https://glacial-reef-79728.herokuapp.com/products/vans",
                              "title": "View on Website"
                          },
                          {
                              "type": "postback",
                              "title": "Show Vans",
                              "payload": "SHOW_VANS"
                          }
                      ]
                  },
                  {
                      "title": "Converse",
                      "image_url": "https://i.postimg.cc/vTCLn3tP/converse.jpg",
                      "default_action": {
                          "type": "web_url",
                          "url": "https://glacial-reef-79728.herokuapp.com/products/converse",
                          "webview_height_ratio": "tall",
                      },
                      "buttons": [
                          {
                              "type": "web_url",
                              "url": "https://glacial-reef-79728.herokuapp.com/products/converse",
                              "title": "View on Website"
                          }, {
                              "type": "postback",
                              "title": "Show Converse",
                              "payload": "SHOW_CONVERSE"
                          }
                      ]
                  },
                  {
                      "title": "Palladium",
                      "image_url": "https://i.postimg.cc/mDnR4s8P/palla.jpg",
                      "default_action": {
                          "type": "web_url",
                          "url": "https://glacial-reef-79728.herokuapp.com/products/palladium",
                          "webview_height_ratio": "tall",
                      },
                      "buttons": [
                          {
                              "type": "web_url",
                              "url": "https://glacial-reef-79728.herokuapp.com/products/palladium",
                              "title": "View on Website"
                          }, {
                              "type": "postback",
                              "title": "Show Palladium",
                              "payload": "SHOW_PALLADIUM"
                          }
                      ]
                  },
              ]
          }
      }
  };
};

module.exports = {
  sendCategoriesTemplate: sendCategoriesTemplate
};