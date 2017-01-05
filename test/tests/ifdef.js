/*

Test the #ifdef directive


© 2016 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

*/


// Create the test
var utils = require('../utils.js'),
	test = utils.test('#ifdef');



// Create a random constant name
var name = utils.randstr();


// Expected results
test.result('r1', true);
test.result('r2', true);



// Code to parse
test.run(`

#define ${name} 42

#ifdef ${name}
	var r1 = true;
#else
	var r1 = false;
#endif

#ifndef VARIABLE_2
	var r2 = true;
#else
	var r2 = false;
#endif

`);
