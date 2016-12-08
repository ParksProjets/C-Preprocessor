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
	c = 200 + Math.round(Math.random() * 100),
	d = a + b;


// Pre-defined constants
var constants = {
	"VARIABLE_3": c
};


// Code to parse
var str = `

#define VARIABLE ${a}
#define VARIABLE_2 ${b}

var r1 = VARIABLE + VARIABLE_2,
	r2 = VARIABLE_3;

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
	var r1 = sandbox.r1,
		r2 = sandbox.r2;

	// Test the results
	if (r1 == d && r2 == c)
		test.success();
	else
		test.error(`the expected result were ${d} and ${c} but we got ${r1} and ${r2}`);
}




// Compile the code
try {
	compiler.compile(str, { constants: constants }, run);
} catch(e) {
	test.error(`compiler execution failed -> ${e.message}`);
}
