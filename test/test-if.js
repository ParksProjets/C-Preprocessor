/*

Test the #if command


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/Compile-JS-like-C

*/


// Libraries
var compiler = require('../index.js'),
	vm = require('vm'),
	utils = require('./utils.js');


// Create the test
var test = utils.test('#if');



// Results
var a = Math.round(Math.random() * 100),
	b = Math.round(Math.random() * 100),
	c = a + b;



// Code to parse
var str = `

var r3 = true;

#define A ${a}
#define B ${b}
#define C ${c} 

#if defined(A) && !defined(D)
	var r1 = true;
#else
	var r1 = false;
#endif

#if A + B != C
	
	#if A == 2
		r3 = false;
	#elif A == 4
		r3 = false;
	#else
		r3 = false;
	#endif

	var r2 = false;
#elif A + B == C + 1
	var r2 = false;
#else
	var r2 = true;
#endif

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
		r2 = sandbox.r2,
		r3 = sandbox.r3;

	// Test the result
	if (r1 && r2 && r3)
		test.success();
	else
		test.error(`we didn't got all 'true': ${r1}, ${r2}, ${r3}`);
}




// Compile the code
try {
	compiler.compile(str, run);
} catch(e) {
	test.error(`compiler execution failed -> ${e.message}`);
}
