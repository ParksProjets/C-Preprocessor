/*#

#if, #ifdef, #ifndef, #elif, #else, #endif commands


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/C-Preprocessor

#*/


// #if command
// See README to know how to use this command
createCommand("if", function(expr) {

	// Exectute 'defined' function
	var i, i2, name;

	while ( (i = expr.indexOf('defined(')) != -1 ) {
		i2 = expr.indexOf(')', i);
		name = expr.substring(i + 8, i2);
		expr = expr.splice(i, i2 + 1 - i, this.defines[name] === undefined ? 'false' : 'true');
	}


	// Replace constants by their values
	expr = this.addDefines(expr);


	// Evaluate the expression
	try {
		var r = eval(expr);
	} catch(e) {
		return this.error('error when evaluating #if expression');
	}


	// If the expr is 'false', go to the next #elif, #else or #endif
	if (!r)
		this.conditionNext();
});





// #ifdef command (note: '#ifdef VARIABLE' is faster than '#if defined(VARIABLE)')
createCommand("ifdef", function(text) {
	
	// Get the constant/macro name
	var i = 0;
	while (text.isAlpha(i))
		i++;

	var name = text.substr(0, i);


	// Check if the constant/macro exists
	if (this.defines[name] === undefined)
		this.conditionNext();
});





// #ifndef command (note: '#ifndef VARIABLE' is faster than '#if !defined(VARIABLE)')
createCommand("ifndef", function(text) {
	
	// Get the constant/macro name
	var i = 0;
	while (text.isAlpha(i))
		i++;

	var name = text.substr(0, i);


	// Check if the constant/macro doesn't exist
	if (this.defines[name] !== undefined)
		this.conditionNext();
});








// #elif command
createCommand("elif", function(expr, called) {

	// If this command wasn't callaed by 'this.callCondition'
	if (!called)
		return this.conditionEnd();

	// Else: execute this command as an #if command
	Commands.if.call(this, expr);
});




// #else command
createCommand("else", function(expr, called) {

	// If this command wasn't called by 'this.callCondition'
	if (!called)
		return this.conditionEnd();

	// Else: nothing to compute, parse the next line
});







// #endif command
createCommand("endif", function(expr, called) {
	// Do nothing beacause this command is already evaluated by 'this.conditionNext'
});
