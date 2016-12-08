/*

Test the #include command


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/Compile-JS-like-C

*/


// Libraries
var compiler = require('../index.js'),
	vm = require('vm'),
	utils = require('./utils.js');


// Create the test
var test = utils.test('#include');



// Code to parse
var str = `

var r = false;

//# This test is running in the base folder
#include "test/file-to-include-once.js"

var n2 = NUMBER_2;

// Include another file
#include "test/file-to-include.js"`;




// Run the code and test it
function run(err, code) {

	// If there is a compiler error
	if (err)
		return test.error(`compiler error -> ${err}`);


	// Run the code
	try {
		var sandbox = {};
		vm.runInNewContext(code, sandbox);
	} catch(e) {
		return test.error(`code execution failed -> ${e.message}`);
	}


	// Results
	var n2 = sandbox.n2,
		r = sandbox.r;

	// Test the results
	if (n2 == 56 && r == true)
		test.success();
	else
		test.error(`the expected results were 56 and true but we got ${n2} and ${r}`);
}




// Compile the code
try {
	compiler.compile(str, run);
} catch(e) {
	test.error(`compiler execution failed -> ${e.message}`);
}
