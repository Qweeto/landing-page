const fs = require('fs');

const [nodePath, executorPath, filename] = process.argv;

function addRelsToExternal(html){
  const whiteList = ['([^/]+\.)?gotointeractive.com'];
  const str = '(<a\s*(?!.*\brel=)[^>]*)(href="https?://)((?!(?:' + whiteList.join('|') + '))[^"]+)"((?!.*\brel=)[^>]*)(?:[^>]*)>';
  
  return html.replace(new RegExp(str, 'igm'), '$1$2$3"$4 rel="nofollow noreferrer noopener noindex">');
}

const file = fs.readFileSync(filename)
const modifiedHTML = addRelsToExternal(file.toString());
fs.writeFileSync(filename, modifiedHTML)
