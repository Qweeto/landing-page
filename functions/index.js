const functions = require('firebase-functions');

exports.dialog = functions.https.onRequest(require('./controllers/dialog.js'));
exports.search = functions.https.onRequest(require('./controllers/search.js'));
exports.suggest = functions.https.onRequest(require('./controllers/suggest.js'));
