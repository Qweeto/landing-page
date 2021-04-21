const admin = require('firebase-admin');
const serviceAccount = require('../service_account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tewst-landing-page.firebaseio.com',
});

module.exports = admin;
