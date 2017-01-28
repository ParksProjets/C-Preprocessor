/*

Test the #define directive for defining a macro


© 2016 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

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
test.result('str', 'Name -> This is (a) label');
test.result('f8', 21);


// Predefined macros
test.setting('macros', {
	"SUM": "(var1, var2) (var1 + var2)"
});



// Run the test
test.run(`

#define NUM 74

#define MACRO1(a,b) a*5*b
#define MACRO2(a,b2,c) MACRO1(a,b2)-c

#define STR(name, label) name + " -> " + label

#define MAT2(a,b,c,d) [a, b, c, d] // A 2x2 matrix

#define MUL(m1,m2) [                 /* Multiplication of matrices */ \
	(m1)[0]*(m2)[0] + (m1)[1]*(m2)[2], /* (0, 0)-element */             \
	(m1)[0]*(m2)[1] + (m1)[2]*(m2)[3], /* (0, 1)-element */             \
	(m1)[2]*(m2)[0] + (m1)[3]*(m2)[2], /* (1, 0)-element */             \
	(m1)[2]*(m2)[1] + (m1)[3]*(m2)[3]] /* (1, 1)-element */


var r1 = MACRO1(${a}, 7),
	r2 = MACRO2(${a}, MACRO1(SUM(${b}, 12), 1), NUM);

var str = STR('Name', 'This is (a) label')

var m = MAT2(1,1,1,0);
for (let i = 0; i < 3; ++i) {
  m = MUL(m,m);
}
var f8 = m[1];

`);
