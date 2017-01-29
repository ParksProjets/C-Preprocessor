#!/usr/bin/env node

/*

C Preprocessor, CLI


© 2017 -
	Guillaume Gonnet
	Al Zohali

License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

*/


// Libraries
var fs = require('fs'),
	path = require('path'),
	compiler = require('../index.js'),
	argv = require('./argv-parser.js');



// Start time
var startTime = Date.now();


// Local options
var options;
var inputFile;
var outputFile;



// Show an error
function error(msg, addHint) {
	console.log('\x1b[31m');
	console.log('The compiler has stopped on an error')
	console.log(`\x1b[1;31mError: ${msg}\x1b[0m`);

	if (addHint)
		console.log(`\nPlease use -h to show the usage`);

	process.exit(1);
}


// Argv parser error
argv.error = function(msg) {
	error(msg, true);
};




// Help argument
argv.add('h', 'help', 0, function help() {
	console.log('\n  Usage: c-preprocessor [options] input-file [output-file]');
	console.log('\n  Options:');
	console.log('\n    -c, --config  configuration file');

	process.exit(1);
});



// Version argument
argv.add('v', 'version', 0, function version() {
	var json = require('../package.json');
	console.log('\n  C-Preprocessor version: ' + json.version);
	process.exit(1);
});




// Configuration file
argv.add('c', 'config', 1, function(arr) {
	try {
		options = JSON.parse(fs.readFileSync(arr[0], 'utf8'));
	} catch(e) {
		error("Can't read configuration file");
	}
});




// Start parsing argv
argv.parse();

// Input & output files
inputFile = argv.argv[0];
outputFile = argv.argv[1];


// If the input file is not specified
if (inputFile === undefined)
	error("input file are required", true);


// If the output file is not specified
if (outputFile === undefined) {
	var parsed = path.parse(inputFile),
		dir = parsed.dir ? parsed.dir+'/' : '',
		name = parsed.name,
		ext = parsed.ext;

	outputFile = dir + name + '-built' + ext;
}






// Preprocess input file
var c = new compiler.Compiler(options);

c.on('error', function(err) {
	return error(err);
});

c.on('success', function(code) {
	fs.writeFile(outputFile, code, function(err) {

		if (err)
			return error(`Unable to write the output file "${outputFile}"`);


		// Display the time spent
		console.log('\x1b[1;32m');
		console.log(`Done in ${(Date.now() - startTime) / 1000}s\x1b[0m`);
	});
});

c.compileFile(inputFile);
