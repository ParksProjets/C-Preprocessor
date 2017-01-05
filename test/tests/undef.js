/*

Test the #undef directive


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/C-Preprocessor

*/


// Create the test
var utils = require('../utils.js'),
	test = utils.test('#undef');



// Random numbers
var a = utils.randint(0, 100),
	b = utils.randint(0, 100);


// Expected results
test.result('r1', b);
test.result('r2', a);



// Run the test
test.run(`

var VARIABLE = ${a};

#define VARIABLE ${b}
var r1 = VARIABLE;

#undef VARIABLE
var r2 = VARIABLE;

`);
