/*

Test the #define directive for defining a variable


© 2016 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

*/


// Create the test
var utils = require('../utils.js'),
	test = utils.test('#define variable');



// Random numbers
var a = utils.randint(0, 100),
	b = utils.randint(0, 100),
	c = utils.randint(200, 300);


// Expected results
test.result('r1', a + b);
test.result('r2', c);
test.result('today', new Date().toLocaleDateString());


// Predefined constants
test.setting('constants', {
	"VARIABLE_3": c
});



// Run the test
test.run(`

#define VARIABLE ${a} // This is a comment
#define VARIABLE_2 ${b}

var r1 = VARIABLE + VARIABLE_2,
	r2 = VARIABLE_3;

var today = "__DATE__";

`);
