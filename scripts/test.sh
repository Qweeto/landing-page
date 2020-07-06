#!/bin/sh

echo 'XML validate'
XMLs=(sitemap.xml opensearch.xml)
for item in ${XMLs[*]}
do
  node ./scripts/xml-validator.js ./www/"$item"
done
