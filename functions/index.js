const functions = require('firebase-functions');
const dialogflow = require('dialogflow');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://tewst-landing-page.firebaseio.com',
});

const serviceAccount = functions.config().service_account;

const app = 'tewst-landing-page';
const sessionClient = new dialogflow.SessionsClient({
  credentials: {
    type: serviceAccount.type,
    project_id: serviceAccount.project_id,
    private_key_id: serviceAccount.private_key_id,
    private_key: serviceAccount.private_key,
    client_email: serviceAccount.client_email,
    client_id: serviceAccount.client_id,
    auth_uri: serviceAccount.auth_uri,
    token_uri: serviceAccount.token_uri,
    auth_provider_x509_cert_url: serviceAccount.auth_provider_x509_cert_url,
    client_x509_cert_url: serviceAccount.client_x509_cert_url,
  },
});

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
    const sessionPath = sessionClient.sessionPath(
      app,
      request.body.session.session_id,
    );
    const responses = await sessionClient.detectIntent({
      session: sessionPath,
      queryInput: {
        text: {
          text: request.body.request.original_utterance,
          languageCode: request.body.meta.locale.toLowerCase(),
        },
      },
    });
    response.send({
      response: {
        text: responses[0].queryResult.fulfillmentText,
        end_session: false,
      },
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
