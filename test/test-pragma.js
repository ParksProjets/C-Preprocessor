/*

Test the #pragma command


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/Compile-JS-like-C

*/


// Libraries
var compiler = require('../index.js'),
	vm = require('vm'),
	utils = require('./utils.js');


// Create the test
var test = utils.test('#pragma');



// Code to parse
var str = `

// This test is running in the base folder
#include "test/file-to-include-once.js"

var n1 = typeof(NUMBER_2);

#undef NUMBER_2

// Re-include the file
#include "test/file-to-include-once.js"

var n2 = typeof(NUMBER_2)

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
		n2 = sandbox.n2;

	// Test the results
	if (n1 == "number" && n2 == "undefined")
		test.success();
	else
		test.error(`some variables don't have the right value: n1=${n1}, n2=${n2}`);
}




// Compile the code
try {
	compiler.compile(str, run);
} catch(e) {
	test.error(`compiler execution failed -> ${e.message}`);
}
