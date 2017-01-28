#!/usr/bin/env node

/*

C Preprocessor, CLI


© 2017 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

*/


// Libraries
var fs = require('fs'),
	path = require('path'),
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

// Show help message
function help() {
	console.log('\n  Usage: c-preprocessor [options] input-file [output-file]');
	console.log('\n  Options:');
	console.log('\n    -c, --config  configuration file');

	process.exit(1);
}

// Read CLI arguments
var configFile;
var inputFile;
var outputFile;

var i = 2;
var n = process.argv.length;

if (process.argv[i] === "--config" || process.argv[i] === "-c") {
	++i;
	if (i < n) {
		configFile = process.argv[i++];
	}
	else {
		help();
	}
}

if (i < n) {
	inputFile = process.argv[i++];
}
else {
	help();
}

if (i < n) {
	outputFile = process.argv[i++];
}

if (i < n) {
	help();
}



// If config file is specified
var options;
if (configFile !== undefined) {
	options = JSON.parse(fs.readFileSync(configFile, 'utf8'));
}


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

