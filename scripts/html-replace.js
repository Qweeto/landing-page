const replace = require('replace-in-file');

const options = {
  files: '.tmp/index.html',
  // remove mobirise anchor
  from: /<section class="engine"><a.[^]*?<\/a><\/section>/g,
  to: ''
};

try {
  const changes = replace.sync(options);
  console.log('Modified files:', changes.join(', '));
} catch (error) {
  console.error('Error occurred:', error);
}
