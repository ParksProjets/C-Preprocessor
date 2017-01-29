/*

A simple argv parser


© 2017 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

*/


// List of short/long name commands
var short = {};
var long = {};


// Remaning parameters
exports.argv = [];



// On error callback
exports.error = null;

// Emit an error
function error(msg) {
	if (exports.error)
		exports.error(msg);
	else
		console.log('Error: ' + msg);
}




// Current length & position
var count = 0;
var n = 0;

// Get the next argument
function next() {
	return process.argv[n++];
}




// Add a new commands
exports.add = function add(name, longName, length, callback) {

	var obj = {
		length: length,
		callback: callback
	};

	short[name] = obj;
	long[longName] = obj;
};




// Call a command
function call(name, isLong) {

	var obj = isLong ? long[name] : short[name];
	if (!obj)
		return error(`Unknown argument '${name}'`);

	if (n + obj.length > count)
		return error(`Too few arguments after '${name}'`);

	var arr = process.argv.slice(n, n + obj.length);
	n += obj.length;

	obj.callback(arr);
};





// Start parsing argv
exports.parse = function() {

	count = process.argv.length;
	n = 2;

	var s;
	while ((s = next()) != undefined) {

		if (s.startsWith('--'))
			call(s.substr(2), true);

		else if (s.startsWith('-'))
			call(s.substr(1), false);

		else
			exports.argv.push(s);
	}
};
