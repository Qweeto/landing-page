#!/bin/sh

# AMP validate
amphtml-validator ./www/index.html
amphtml-validator ./www/archive.html
amphtml-validator ./www/mission.html

# XML validate
node ./scripts/xml-validator.js
