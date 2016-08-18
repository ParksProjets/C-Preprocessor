/*

Test the #define command for defining a variable


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/Compile-JS-like-C

*/


// Libraries
var compiler = require('../index.js'),
	vm = require('vm'),
	utils = require('./utils.js');


// Create the test
var test = utils.test('#define variable');



// Results
var a = Math.round(Math.random() * 100),
	b = Math.round(Math.random() * 100),
	c = a + b;



// Code to parse
var str = `

#define VARIABLE ${a}
#define VARIABLE_2 ${b}

var result = VARIABLE + VARIABLE_2;

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


	// Result
	var r = sandbox.result;

	// Test the result
	if (r == c)
		test.success();
	else
		test.error(`the expected result was ${c} but we got ${r}`);
}




// Compile the code
try {
	compiler.compile(str, run);
} catch(e) {
	test.error(`compiler execution failed -> ${e.message}`);
}
