/*

Test the #define command for defining a macro


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/Compile-JS-like-C

*/


// Libraries
var compiler = require('../index.js'),
	vm = require('vm'),
	utils = require('./utils.js');


// Create the test
var test = utils.test('#define macro');



// Results
var a = Math.round(Math.random() * 100),
	b = Math.round(Math.random() * 100),
	c1 = a * 5 * 7,
	c2 = a*(b+12)*5*5 - 74;


// Pre-defined macros
var macros = {
	"SUM": "(var1, var2) (var1 + var2)"
};


// Code to parse
var str = `

#define NUM 74

#define MACRO1(a,b) a*5*b
#define MACRO2(a,b2,c) MACRO1(a,b2)-c

var r1 = MACRO1(${a}, 7),
	r2 = MACRO2(${a}, MACRO1(SUM(${b}, 12), 1), NUM);

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
	if (r1 == c1 && r2 == c2)
		test.success();
	else
		test.error(`the expected results were ${c1} and ${c2} but we got ${r1} and ${r2}`);
}




// Compile the code
try {
	compiler.compile(str, { macros: macros }, run);
} catch(e) {
	test.error(`compiler execution failed -> ${e.message}`);
}
