const functions = require('firebase-functions');
const dialogflow = require('dialogflow');

const credentials = functions.config().service_account;
const app = 'tewst-landing-page';

exports.search = functions.https.onRequest((request, response) => {
  const cx = '013887321856262968721:y8vq-syjqom';
  response.redirect(`https://cse.google.com/cse?cx=${cx}&q=${request.query.name}`);
});

exports.suggest = functions.https.onRequest((request, response) => {
  const yu = '5519222721557041240';
  response.redirect(`https://suggest.yandex.ru/suggest-ff.cgi?part=${request.query.text}&amp;uil=ru&amp;v=3&amp;sn=5&amp;lr=10371&amp;yu=${yu}`);
});

exports.dialog = functions.https.onRequest(async (request, response) => {
  try {
    if (!request.body.request) {
      response.status(400).send(`<h1>Проверьте правильность запроса.</h1>`);
      return;
    }
    // Click button link
    if (!request.body.request.hasOwnProperty('original_utterance')) {
      response.send({
        response: {
          text: 'Приятно было помочь.',
          end_session: true,
        },
        version: request.body.version,
      });
      return;
    }
    const { original_utterance } = request.body.request;
    // Welcome screen
    if (original_utterance.length === 0) {
      response.send({
        response: {
          text: 'Привет. Это помощник по навигации сайта goto Interactive Software.',
          end_session: false,
        },
        version: request.body.version,
      });
      return;
    }
    // YaDialog ping
    if (original_utterance === 'ping') {
      response.send({
        response: {
          text: 'понг',
          end_session: false,
        },
        version: request.body.version,
      });
      return;
    }
    const sessionClient = new dialogflow.SessionsClient({ credentials });
    const sessionPath = sessionClient.sessionPath(
      app,
      request.body.session.session_id,
    );
    const responses = await sessionClient.detectIntent({
      session: sessionPath,
      queryInput: {
        text: {
          text: original_utterance,
          languageCode: request.body.meta.locale.toLowerCase(),
        },
      },
    });
    const matches = responses[0].queryResult.fulfillmentText.match(/\bhttps?:\/\/\S+/gi);
    const responseObj = {
      text: responses[0].queryResult.fulfillmentText,
    };
    if (matches && matches.length) {
      responseObj.end_session = false;
      responseObj.buttons = matches.map(url => {
        return {
          title: 'Открыть ссылку',
          payload: 'button1',
          url: url,
          hide: true,
        };
      });
    } else {
      responseObj.end_session = true;
    }
    response.send({
      response: responseObj,
      version: request.body.version,
    });
  } catch (error) {
    response.send({
      response: {
        text: error.message,
        end_session: true,
      },
      version: request.body.version,
    });
  }
});
