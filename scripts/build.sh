#!/bin/sh

# minify
html-minifier --collapse-whitespace --remove-comments --use-short-doctype --minify-css true --minify-js true --input-dir ./mobirise/ --output-dir .tmp/ --file-ext html
scripts/html-replace.sh

# copy
rsync -va ./static/ ./www/
rsync -va ./mobirise/robots.txt ./www/
rsync -va ./mobirise/sitemap.xml ./www/
rsync -va ./mobirise/assets ./www/
rsync -avz --include='*.html' --exclude='*' ./.tmp/ ./www/

# typograf
typograf --locale ru,en-US .tmp/index.html > ./www/index.html
typograf --locale ru,en-US .tmp/archive.html > ./www/archive.html
typograf --locale ru,en-US .tmp/mission.html > ./www/mission.html

# html replace: remove odd anchors
ANCHOR_REGEX="/<section class=\"engine\"><a.[^]*?<\/a><\/section>/g"
replace-in-file "$ANCHOR_REGEX" "" ./www/index.html --encoding=utf-8 --isRegex
replace-in-file "$ANCHOR_REGEX" "" ./www/mission.html --encoding=utf-8 --isRegex
replace-in-file "$ANCHOR_REGEX" "" ./www/archive.html --encoding=utf-8 --isRegex

# html replace: insert opensearch
OPENSEARCH_REPLACE_LINK="<meta charset='UTF-8'><link rel='search' type='application/opensearchdescription+xml' title='gotois' href='./opensearch.xml'/>"
replace-in-file '<meta charset="UTF-8">' "$OPENSEARCH_REPLACE_LINK" ./www/index.html --encoding=utf-8
replace-in-file '<meta charset="UTF-8">' "$OPENSEARCH_REPLACE_LINK" ./www/mission.html --encoding=utf-8
replace-in-file '<meta charset="UTF-8">' "$OPENSEARCH_REPLACE_LINK" ./www/archive.html --encoding=utf-8

node scripts/replace-links.js ./www/index.html
node scripts/replace-links.js ./www/mission.html
node scripts/replace-links.js ./www/archive.html
