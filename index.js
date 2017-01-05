/*

C Preprocessor


© 2016 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/Compile-JS-like-C

*/


// Get the lib object
var lib = require('./lib/compiler.js');


// Export Compiler class
exports.Compiler = lib.Compiler;



// Quick access: compile a code
exports.compile = function(code, options, callback) {

	// If there isn't an option but a callback
	if (typeof options == "function") {
		callback = options;
		options = null;
	}


	// Create the compiler and attach it the callback
	var compiler = new lib.Compiler(options);

	compiler.once('error', function(msg) {
		callback && callback(msg, null);
	});

	compiler.once('success', function(result) {
		callback && callback(null, result);
	});

	compiler.compile(code);
};





// Quick access: compile a file
exports.compileFile = function(file, options, callback) {

	// If there isn't an option but a callback
	if (typeof options == "function") {
		callback = options;
		options = null;
	}


	// Create the compiler and attach it the callback
	var compiler = new lib.Compiler(options);

	compiler.once('error', function(msg) {
		callback && callback(msg, null);
	});

	compiler.once('success', function(result) {
		callback && callback(null, result);
	});

	compiler.compileFile(file);
};
