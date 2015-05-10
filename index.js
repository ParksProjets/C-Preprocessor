/*

Compile JS like C

*/


var compiler = require('./compiler.js');



// Call in command line

if (require.main === module) {


	function Error(msg) {
		console.log('\x1b[31m');
		console.log('The compiler has stopped on an error')
		console.log('\x1b[1;31mError: %s\x1b[0m', msg);

		process.exit(1);
	}





	// Read arguments

	if (process.argv[2] === undefined || process.argv[3] === undefined)
		Error("input and output files are required");

	var mainFile = process.argv[2];
	var outputFile = process.argv[3];




	// Parse the main file

	try {
		var outputTxt = compiler.c(mainFile);
	} catch(e) {
		Error(e);
	}

	try {
		fs.writeFileSync(outputFile, outputTxt);
	} catch(e) {
		Error('Unable to write the output file "' + outputFile + '"');
	}



	// Display time

	console.log('\x1b[1;32m');
	console.log("Done in %ss\x1b[0m", (Date.now() - startTime) / 1000);
	
	return;
}









// Call with require()

module.exports = {

	compile: function(file, options, callback) {

		if (typeof options == "function")
			callback = options;

		var result;

		try {
			result = compiler.p(file);
		} catch(e) {
			callback(e, '');
			return;
		}

		callback(null, result);
	},



	compileStr: function(str, options, callback) {

		if (typeof options == "function")
			callback = options;

		var result;

		try {
			compiler.p(str, true);
		} catch(e) {
			callback(e, '');
			return;
		}

		callback(null, result);
	}

};

