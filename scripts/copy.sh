#!/bin/sh
rsync -va ./static/ ./www/
rsync -va ./mobirise/assets ./www/
cp -v ./.tmp/index.html ./www/index.html
