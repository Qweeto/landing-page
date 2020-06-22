const functions = require('firebase-functions');

exports.search = functions.https.onRequest((request, response) => {
  const cx = '013887321856262968721:y8vq-syjqom';
  response.redirect(`https://cse.google.com/cse?cx=${cx}&q=${request.query.name}`);
});

exports.suggest = functions.https.onRequest((request, response) => {
  response.redirect(`https://suggest.yandex.ru/suggest-ff.cgi?part=${request.query.text}&amp;uil=ru&amp;v=3&amp;sn=5&amp;lr=10371&amp;yu=5519222721557041240`);
});
