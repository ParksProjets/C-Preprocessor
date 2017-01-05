/*#

#if, #ifdef, #ifndef, #elif, #else, #endif directives


© 2016 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

#*/


// #if directive
// See README to know how to use this directive
createDirective("if", function(expr) {

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





// #ifdef directive (note: '#ifdef VARIABLE' is faster than '#if defined(VARIABLE)')
createDirective("ifdef", function(text) {
	
	// Get the constant/macro name
	var name = text.split(' ')[0];

	// Check if the constant/macro exists
	if (this.defines[name] === undefined)
		this.conditionNext();
});





// #ifndef directive (note: '#ifndef VARIABLE' is faster than '#if !defined(VARIABLE)')
createDirective("ifndef", function(text) {
	
	// Get the constant/macro name
	var name = text.split(' ')[0];

	// Check if the constant/macro doesn't exist
	if (this.defines[name] !== undefined)
		this.conditionNext();
});








// #elif directive
createDirective("elif", function(expr, called) {

	// If this directive wasn't callaed by 'this.callCondition'
	if (!called)
		return this.conditionEnd();

	// Else: execute this directive as an #if directive
	Directives.if.call(this, expr);
});




// #else directive
createDirective("else", function(expr, called) {

	// If this directive wasn't called by 'this.callCondition'
	if (!called)
		return this.conditionEnd();

	// Else: nothing to compute, parse the next line
});







// #endif directive
createDirective("endif", function(expr, called) {
	// Do nothing beacause this directive is already evaluated by 'this.conditionNext'
});
