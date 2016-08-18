/*

Useful functions for the tests


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/Compile-JS-like-C

*/



// Class: Test
var Test = function(name) {
	this.name = name;
};


// Log a success
Test.prototype.success = function() {
	console.log(`\x1b[1;32m${this.name} test passed\x1b[0m\n`);
};


// Log an error
Test.prototype.error = function(error) {
	console.log(`\x1b[1;31m${this.name} test error`);

	if (error)
		console.log(`\x1b[1;31m  Error: ${error}`);

	console.log('\x1b[0m');
};






// Create a test
exports.test = function(name) {
	return new Test(name);
};
