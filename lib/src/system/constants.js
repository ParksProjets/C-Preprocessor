/*#

#define a constant


© 2016 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

#*/


// Create a constant
Processor.prototype.createConstant =
Compiler.prototype.createConstant = function(name, value, addDefines) {

	// Add constants value to the constant value
	if (addDefines !== false)
		value = this.addDefines(value);

	// Store the constant
	this.defines[name] = {
		name: name,
		value: value
	};
};





// Set a compiler constant
Processor.prototype._compConst =
Compiler.prototype._compConst = function(name, value) {
	this.createConstant('__' + name + '__', value, false);
};





// Add a constant in a line
Processor.prototype.addConstant =
Compiler.prototype.addConstant = function(line, i, constant) {
	
	line = line.splice(i, constant.name.length, constant.value);
	i += constant.value.length;

	return { line: line, index: i };
};
