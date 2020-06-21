#!/bin/sh

echo 'AMP validate'
HTMLs=(404.html archive.html index.html manifest.html vacancies.html)
for item in ${HTMLs[*]}
do
  if amphtml-validator ./www/"$item" --format json | grep -q '"status":"FAIL"'
    then
      echo "fail" $item
      exit 1
    else
      echo "ok" $item
  fi
done

echo 'XML validate'
XMLs=(sitemap.xml opensearch.xml)
for item in ${XMLs[*]}
do
  node ./scripts/xml-validator.js ./www/"$item"
done
