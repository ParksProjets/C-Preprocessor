#!/usr/bin/env node

var fs = require('fs');
var compiler = require('../lib/compiler.js');

var startTime = Date.now();




// errors

function error(msg) {
	console.log('\x1b[31m');
	console.log('The compiler has stopped on an error')
	console.log('\x1b[1;31mError: %s\x1b[0m', msg);

	process.exit(1);
}





// Read arguments

if (process.argv[2] === undefined || process.argv[3] === undefined)
	error("input and output files are required");

var mainFile = process.argv[2];
var outputFile = process.argv[3];






// Parse the main file

try {
	var outputTxt = compiler.p(mainFile);
} catch(e) {
	error(e);
}

try {
	fs.writeFileSync(outputFile, outputTxt);
} catch(e) {
	error('Unable to write the output file "' + outputFile + '"');
}







// Display time

console.log('\x1b[1;32m');
console.log("Done in %ss\x1b[0m", (Date.now() - startTime) / 1000);