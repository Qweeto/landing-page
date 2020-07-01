#!/bin/sh

# minify
html-minifier --collapse-whitespace --remove-comments --use-short-doctype --minify-css true --minify-js true --input-dir ./mobirise/ --output-dir .tmp/ --file-ext html

# copy
rsync -va ./static/ ./www/
rsync -va ./mobirise/robots.txt ./www/
rsync -va ./mobirise/sitemap.xml ./www/
rsync -va ./mobirise/assets ./www/
rsync -avz --include='*.html' --exclude='*' ./.tmp/ ./www/

ANCHOR_REGEX="/<section class=\"engine\"><a.[^]*?<\/a><\/section>/g"
OPENSEARCH_REPLACE_LINK="<meta charset='UTF-8'><link rel='search' type='application/opensearchdescription+xml' title='gotois: Search' href='//gotointeractive.com/opensearch.xml'>"
JSON_LD=`cat static/json-ld.json`

HTMLs=(404.html archive.html index.html manifest.html vacancies.html)
for item in ${HTMLs[*]}
do
  # typograf
  typograf --locale ru,en-US .tmp/"$item" > ./www/"$item"

  # html replace: remove odd anchors
  replace-in-file "$ANCHOR_REGEX" "" ./www/"$item" --encoding=utf-8 --isRegex

  # html replace: insert opensearch
  replace-in-file '<meta charset="UTF-8">' "$OPENSEARCH_REPLACE_LINK" ./www/"$item" --encoding=utf-8

  # html replace: insert structured data and manifest.json
  replace-in-file '</head>' "<script type="application/ld+json">${JSON_LD}</script><link rel="manifest" href="/manifest.json" crossOrigin="use-credentials"><meta name="theme-color" content="#16161d"/></head>" ./www/"$item" --encoding=utf-8

  # norefferer links
  node scripts/replace-links.js ./www/"$item"

  # PWA Service Worker Registration
  if [[ "$item" == "index.html" ]]
  then
    echo "Registration sw.js"
    replace-in-file '</body>' "<script>if ('serviceWorker' in navigator) {navigator.serviceWorker.register('sw.js').then(function (reg) {console.log('Registration succeeded. Scope is ' + reg.scope);}).catch(function (error) {console.error('Trouble with sw: ', error);});}</script></body>" ./www/"$item" --encoding=utf-8
  fi

  # AMP to YaTurbo
  node ./scripts/turbify.js $item
  node ./scripts/xml-validator.js ./www/turbo/"$item".xml
done
