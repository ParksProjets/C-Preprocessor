/*

Some useful functions


© 2016 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

*/


// Test factory
var factory = require('./factory.js');


// Create a test
exports.test = function(name) {
	return new factory.Test(name);
};



// Random number in {a,..,b}
exports.randint = function(a, b) {
	return Math.round(a + Math.random() * (b - a));
};


// Random string
exports.randstr = function(length) {
	var str = Math.random().toString(36).replace(/[^a-z]+/g, '');
	return str.substr(0, length || exports.randint(5, 15));
};
