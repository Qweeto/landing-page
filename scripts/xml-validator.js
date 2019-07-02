const fs = require('fs');
const libxmljs = require('libxmljs');

const sitemap = fs.readFileSync('./www/sitemap.xml');
const sitemapDoc = libxmljs.parseXml(sitemap);

if (sitemapDoc.errors.length) {
	console.log(sitemapDoc);
	process.exit(1);
}

const opensearch = fs.readFileSync('./www/opensearch.xml');
const opensearchDoc = libxmljs.parseXml(opensearch);

if (opensearchDoc.errors.length) {
  console.log(opensearchDoc);
  process.exit(1);
}
