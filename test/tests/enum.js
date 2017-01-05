/*

Test the #enum directive


© 2016 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

*/


// Create the test
var utils = require('../utils.js'),
	test = utils.test('#enum');



// Random numbers
var step = utils.randint(5, 20),
	start = utils.randint(0, 100);


// Expected results
test.result('r1', 6);
test.result('r2', start + 2*step);



// Run the test
test.run(`

#enum
	A, B, C, D
#endenum

#enum start=${start}, step=${step}
	Car, Bike, Truck, Plane
#endenum

var r1 = A + B + C + D;
var r2 = Truck;

`);
