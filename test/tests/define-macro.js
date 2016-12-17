/*

Test the #define command for defining a macro


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/C-Preprocessor

*/


// Create the test
var utils = require('../utils.js'),
	test = utils.test('#define macro');



// Random numbers
var a = utils.randint(0, 100),
	b = utils.randint(0, 100);


// Expected results
test.result('r1', a * 5 * 7);
test.result('r2', a*(b+12)*5*5 - 74);


// Predefined macros
test.setting('macros', {
	"SUM": "(var1, var2) (var1 + var2)"
});



// Run the test
test.run(`

#define NUM 74

#define MACRO1(a,b) a*5*b
#define MACRO2(a,b2,c) MACRO1(a,b2)-c

var r1 = MACRO1(${a}, 7),
	r2 = MACRO2(${a}, MACRO1(SUM(${b}, 12), 1), NUM);

`);
