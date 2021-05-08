#!/bin/sh

# copy static
rsync -va ./static/ ./www/
rsync -va ./mobirise/robots.txt ./www/
rsync -va ./mobirise/offline.html ./www/
rsync -va ./mobirise/sitemap.xml ./www/
rsync -va ./mobirise/assets ./www/

HTMLs=(404.html index.html manifest.html vacancies.html)
for item in ${HTMLs[*]}
do
  mobirise-optimizator $item --white-list="gotointeractive.com,baskovsky.ru" --minifier=true --input-dir "./mobirise/" --output-dir "www/" --open-search-title="gotois: Search" --open-search-path="//gotointeractive.com/opensearch.xml" --pwa-manifest-path="/manifest.json" --pwa-sw-path="/sw.js" --pwa-install-service-worker-path="/install-service-worker.html" --ld-file="static/json-ld.json"

  echo 'AMP validate'
  if amphtml-validator ./www/"$item" --format json | grep -q '"status":"FAIL"'
    then
      echo "fail" $item
      exit 1
    else
      echo "ok" $item
  fi

  # AMP to YaTurbo
  node ./scripts/turbify.js $item
  node ./scripts/xml-validator.js ./www/turbo/"$item".xml
done
