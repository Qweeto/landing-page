const functions = require('firebase-functions');

exports.search = functions.https.onRequest((request, response) => {
  const cx = '013887321856262968721:y8vq-syjqom';
  response.redirect(`https://cse.google.com/cse?cx=${cx}&q=${request.query.name}`);
});
