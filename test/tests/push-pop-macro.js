/*

Test the #pragma push_macro(...) and #pragma pop_macro(...) directives


© 2016 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

*/


// Create the test
var utils = require('../utils.js'),
	test = utils.test('#pragma push_macro/pop_macro');



// Expected results
test.result('r1', 52);
test.result('r2', 42);



// Code to run
test.run(`

#define VARIABLE 42

#pragma push_macro("VARIABLE")
#define VARIABLE 52

var r1 = VARIABLE;

#pragma pop_macro("VARIABLE")

var r2 = VARIABLE;

`);
