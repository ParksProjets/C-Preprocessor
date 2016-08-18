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
#include "test/file-to-include.js"
#include "test/file-to-include-once.js"

var n1 = NUMBER,
	n2 = NUMBER_2;

`;




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
	var n1 = sandbox.n1,
		n2 = sandbox.n2,
		r = sandbox.r;

	// Test the results
	if (n1 == 42 && n2 == 56 && r)
		test.success();
	else
		test.error(`some variables don't have the right value: n1=${n1}, n2=${n2}, r=${r}`);
}




// Compile the code
try {
	compiler.compile(str, run);
} catch(e) {
	test.error(`compiler execution failed -> ${e.message}`);
}
