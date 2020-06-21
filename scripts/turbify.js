const fs = require('fs');
const TR = require('turbo-rss');
const cheerio = require('cheerio');
const pkg = require('../package.json');

const [nodePath, executorPath, filename] = process.argv;

fs.mkdir('www/turbo', { recursive: true }, (error) => {
  if (error) throw error;
});
const feed = new TR({
  title: pkg.name,
  description: pkg.description,
  link: pkg.homepage,
  language: 'ru',
});
const menu = [{
  link: 'https://gotointeractive.com/',
  text: 'Главная'
}, {
  link: 'https://gotointeractive.com/manifest',
  text: 'Манифест'
}, {
  link: 'https://gotointeractive.com/archive',
  text: 'Архив'
}, {
  link: 'https://gotointeractive.com/vacancies',
  text: 'Вакансии'
}];
const page = fs.readFileSync('www/' + filename).toString();
const $ = cheerio.load(page, {
  normalizeWhitespace: true,
},);
const title = $('title').text();
const body = $('body').html();
feed.item({
  title,
  image_url: 'https://gotointeractive.com/assets/images/logo-4-512x256.png',
  url: 'https://gotointeractive.com/' + filename,
  author: pkg.author.name,
  date: new Date(),
  content: body,
  menu,
  related: [],
});
const xml = feed.xml();
fs.writeFileSync('www/turbo/' + filename + '.xml', Buffer.from(xml));
