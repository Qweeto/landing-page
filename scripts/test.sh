#!/bin/sh

echo 'AMP validate'
HTMLs=(index.html archive.html mission.html)
for item in ${HTMLs[*]}
do
  amphtml-validator ./www/"$item"
done

echo 'XML validate'
XMLs=(sitemap.xml opensearch.xml turbo.rss.xml)
for item in ${XMLs[*]}
do
  node ./scripts/xml-validator.js ./www/"$item"
done
