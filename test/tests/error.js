/*

Test the #error directive


© 2016 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

*/


// Create the test
var utils = require('../utils.js'),
	test = utils.test('#error');



// Expected the rsult
var text = 'Math is the life !';


// Store error and success functions
var error = test.error,
	success = test.success;


// Override error function for checking if the right error is called
test.error = function(err) {
	var msg = 'compiler error -> (line 3 in "main") ' + text;

	if (err == msg)
		success.call(test);
	else
		error.call(test, "we didn't get the right message");
};


// Override success function
test.success = function(err) {
	error.call(test, 'no error raised');
};



// Run the test
test.run(`

#error ${text}

`);
