#!/usr/bin/env node

/*

C Preprocessor, CLI


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/C Preprocessor

*/


// Libraries
var fs = require('fs'),
	compiler = require('../index.js');


// Start time
var startTime = Date.now();



// Show an error
function error(msg) {
	console.log('\x1b[31m');
	console.log('The compiler has stopped on an error')
	console.log(`\x1b[1;31mError: ${msg}\x1b[0m`);

	process.exit(1);
}




// Read CLI arguments
if (process.argv[2] === undefined || process.argv[3] === undefined)
	error("input and output files are required");

var inputFile = process.argv[2];
var outputFile = process.argv[3];




// Parse the input file
compiler.compileFile(inputFile, function(err, code) {

	if (err)
		return error(err);


	// Save the result in the output file
	fs.writeFile(outputFile, code, function(err) {

		if (err)
			return error(`Unable to write the output file "${outputFile}"`);


		// Display the time spent
		console.log('\x1b[1;32m');
		console.log(`Done in ${(Date.now() - startTime) / 1000}s\x1b[0m`);
	});
});
