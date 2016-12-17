/*

Test the #include command


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/C-Preprocessor

*/


// Create the test
var utils = require('../utils.js'),
	test = utils.test('#include');



// Expected results
test.result('n2', 56);
test.result('r', true);



// Code to parse
test.run(`

var r = false;

// This test is running in the base folder
#include "test/ressources/file-to-include-once.js"

var n2 = NUMBER_2;

// Include another file
#include "test/ressources/file-to-include.js"`);
