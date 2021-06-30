const fs = require('fs');
const TR = require('turbo-rss');
const cheerio = require('cheerio');
const pkg = require('../package.json');

const [nodePath, executorPath, filename] = process.argv;
const intput_dir = 'www';
const output_dir = 'www/turbo';

function turbify({ image_url, menu }) {
  fs.mkdir(output_dir, { recursive: true }, (error) => {
    if (error) throw error;
  });
  const page = fs.readFileSync(intput_dir + '/' + filename).toString();
  const $ = cheerio.load(page, {
    normalizeWhitespace: true,
  },);
  const title = $('title').text();
  const body = $('body').html();
  const feed = new TR({
    title: pkg.name,
    description: pkg.description,
    link: pkg.homepage,
    language: 'ru',
  });
  feed.item({
    title,
    image_url,
    url: pkg.homepage + filename,
    author: pkg.author.name,
    date: new Date(),
    content: body,
    menu,
    related: [],
  });
  return feed.xml();
}

const turboPage = turbify({
  image_url: pkg.homepage + 'assets/images/logo-4-512x256.png',
  menu: [{
    link: pkg.homepage,
    text: 'Главная',
  }, {
    link: pkg.homepage + 'manifest',
    text: 'Манифест',
  }, {
    link: pkg.homepage + 'archive',
    text: 'Архив',
  }, {
    link: pkg.homepage + 'mantra',
    text: 'Мантра',
  }, {
    link: pkg.homepage + 'vacancies',
    text: 'Вакансии',
  }]
});
fs.writeFileSync(`${output_dir}/${filename}.xml`, Buffer.from(turboPage));
