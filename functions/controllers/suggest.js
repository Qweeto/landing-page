module.exports = (request, response) => {
  const yu = '5519222721557041240';
  response.redirect(`https://suggest.yandex.ru/suggest-ff.cgi?part=${request.query.text}&amp;uil=ru&amp;v=3&amp;sn=5&amp;lr=10371&amp;yu=${yu}`);
}
