/*

Test the #enum command


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/Compile-JS-like-C

*/


// Libraries
var compiler = require('../index.js'),
	vm = require('vm'),
	utils = require('./utils.js');


// Create the test
var test = utils.test('#enum');



// Code to parse
var str = `

#enum
	A, B, C, D
#endenum

#enum start=5, step=9
	Car, Bike, Truck
#endenum

var r1 = A + B + C + D;
var r2 = Truck;

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
	if (r1 == 6 && r2 == 23)
		test.success();
	else
		test.error(`some variables don't have the right value: r1=${r1}, r2=${r2}`);
}




// Compile the code
try {
	compiler.compile(str, run);
} catch(e) {
	test.error(`compiler execution failed -> ${e.message}`);
}
