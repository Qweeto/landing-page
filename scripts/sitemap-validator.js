const fs = require('fs');
const libxmljs = require('libxmljs');

const sitemap = fs.readFileSync('./www/sitemap.xml');
const sitemapDoc = libxmljs.parseXml(sitemap);

if (sitemapDoc.errors.length) {
	console.log(sitemapDoc)
	process.exit(1);
}