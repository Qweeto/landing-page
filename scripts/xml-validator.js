const fs = require('fs');
const libxmljs = require('libxmljs');

const [nodePath, executorPath, filename] = process.argv;

const file = fs.readFileSync(filename);
const fileXML = libxmljs.parseXml(file);
if (fileXML.errors.length) {
	console.log(fileXML);
	process.exit(1);
}

console.log(filename, 'PASS')
