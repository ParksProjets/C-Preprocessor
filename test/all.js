#!/usr/bin/env node

/*

Start all tests


© 2016 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

*/


var fs = require('fs');


// Run all js files in the 'tests' folder
fs.readdir('test/tests', function(err, files) {

	if (err)
		return console.error("Can't read 'test/tests' folder");

	for (var i = 0, l = files.length; i < l; i++)
		require('./tests/' + files[i])
});
