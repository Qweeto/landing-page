#!/bin/sh
rsync -va ./static/ ./www/
rsync -va ./mobirise/robots.txt ./www/
rsync -va ./mobirise/sitemap.xml ./www/
rsync -va ./mobirise/assets ./www/
rsync -avz --include='*.html' --exclude='*' ./.tmp/ ./www/
