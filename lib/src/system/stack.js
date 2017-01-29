/*#

Stack system


© 2017 -
	Guillaume Gonnet
	Al Zohali

License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

#*/


// Save the current value of a macro on top of the stack
Processor.prototype.pushMacro = function(name) {

	if (this.defines[name] === undefined)
		return this.error(`macro ${name} is not defined, cannot push it`);
	
	
	if (this.stack[name] === undefined)
		this.stack[name] = [];

	this.stack[name].push(this.defines[name]);
};




// Set current value of the specified macro to previously saved value
Processor.prototype.popMacro = function(name) {

	if (this.stack[name] === undefined || this.stack[name].length == 0)
		return this.error(`stack for macro ${name} is empty, cannot pop from it`);

	
	this.defines[name] = this.stack[name].pop();
};
