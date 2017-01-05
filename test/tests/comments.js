/*

Test the //# and /*# comments


© 2016 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

*/


// Create the test
var utils = require('../utils.js'),
	test1 = utils.test('comments (enabled)'),
	test2 = utils.test('comments (disabled)');



// Expected results
test1.result('result', 0);
test2.result('result', 25);


// Disable comment espace
test2.setting('commentEscape', false);



// Code to run
var code = `

var r1 = \`

/*#
This is a comment
#*/

\`;


var result = r1.trim().length;

`;


// Run the tests
test1.run(code);
test2.run(code);
