#!/bin/sh

# minify
html-minifier --collapse-whitespace --remove-comments --use-short-doctype --minify-css true --minify-js true --input-dir ./mobirise/ --output-dir .tmp/ --file-ext html
scripts/html-replace.sh

# html replace
replace-in-file "/<section class="engine"><a.[^]*?<\/a><\/section>/g" "" .tmp/index.html --encoding=utf-8 --isRegex

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
