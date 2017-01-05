/*

Test the #pragma directive


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/Compile-JS-like-C

*/


// Create the test
var utils = require('../utils.js'),
	test = utils.test('#pragma');



// Expected results
test.result('n1', "number");
test.result('n2', "undefined");



// Run the test
test.run(`

// This test is running in the base folder
#include "test/ressources/file-to-include-once.js"

var n1 = typeof(NUMBER_2);

#undef NUMBER_2

// Re-include the file
#include "test/ressources/file-to-include-once.js"

var n2 = typeof(NUMBER_2)

`);
