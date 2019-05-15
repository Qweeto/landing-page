const replace = require('replace-in-file');

const options = {
  encoding: 'utf8',
  files: '.tmp/*.html',
  // remove mobirise anchor
  from: /<section class="engine"><a.[^]*?<\/a><\/section>/g,
  to: ''
};

try {
  const changes = replace.sync(options);
  console.log('Modified files:', JSON.stringify(changes));
} catch (error) {
  console.error('Error occurred:', error);
}
