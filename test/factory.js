/*

Test factory


© 2016 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

*/


// Libraries
var compiler = require('../index.js'),
	vm = require('vm');



// Test class
var Test = function(name) {
	this.name = name;
	this.results = {};
	this.settings = {};
};


// Constructor & export
Test.prototype.constructor = Test;
exports.Test = Test;



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




// Add a result
Test.prototype.result = function(name, value) {
	this.results[name] = value;
};



// Set a setting
Test.prototype.setting = function(name, value) {
	this.settings[name] = value;
};





// Run the test
Test.prototype.run = function(code) {
	var _this = this;


	// Run the code and check the results
	function run(err, code) {

		// If there is a compiler error
		if (err)
			return _this.error(`compiler error -> ${err}`);


		// Run the code
		try {
			var sandbox = {};
			vm.runInNewContext(code, sandbox);
		} catch(e) {
			return _this.error(`code execution failed -> ${e.message}`);
		}


		// Check the results
		for (var n in _this.results) {
			var e = _this.results[n],
				r = sandbox[n];

			if (e !== r)
				return _this.error(`the expected value of variable ${n} was '${e}' but we got '${r}'`);
		}


		// All is OK: log the success
		_this.success();
	}


	// Compile the code
	try {
		compiler.compile(code, this.settings, run);
	} catch(e) {
		this.error(`compiler execution failed -> ${e.message}`);
		console.log(e);
	}
};
