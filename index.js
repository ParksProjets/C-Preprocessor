/*

Compile JS like C


© 2015 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/Compile-JS-like-C

*/


var compiler = require('./lib/compiler.js');



function modifyOptions(options) {

	if (!options || typeof options != "object")
		return;

	for (var i in options)
		compiler.o[i] = options[i];
}



module.exports = {

	compile: function(file, options, callback) {

		if (typeof options == "function")
			callback = options;
		else
			modifyOptions(options);

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
		else
			modifyOptions(options);

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