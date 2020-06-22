const functions = require('firebase-functions');

exports.search = functions.https.onRequest((request, response) => {
  response.redirect(`https://cse.google.com/cse?cx=013887321856262968721:y8vq-syjqom&q=${request.query.name}`);
});
