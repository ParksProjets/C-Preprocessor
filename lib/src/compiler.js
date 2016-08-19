/*#

Compiler class


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/C-Preprocessor

#*/


var Compiler = function(opt) {

	// Inherit of EventEmitter
	EventEmitter.call(this);


	// Options object
	this.options = {};
	this.options.endLine = '\n';
	this.options.commentEscape = true;
	this.options.includeSpaces = 0;
	this.options.emptyLinesLimit = 0;
	this.options.basePath = './';
	this.options.stopOnError = true;
	this.options.enumInHex = true;

	// Apply options
	opt = opt || {};
	for (var i in opt)
		this.options[i] = opt[i];


	// Defined objects
	this.defines = {};

	// #pragma once include
	this.includeOnce = {};
};



// Inherit of EventEmitter, constructor and exports
Compiler.prototype = Object.create(EventEmitter.prototype);
Compiler.prototype.constructor = Compiler;
exports.Compiler = Compiler;




// Compile a text code
Compiler.prototype.compile = function(code, filename) {
	if (filename)
		this.options.filename = filename;

	var processor = new Processor(this, code);
	processor.run();
};





// Compile a file
Compiler.prototype.compileFile = function(file) {
	var _this = this;
	
	fs.readFile(_this.options.basePath + file, 'utf8', function(err, code) {

		if (err)
			return _this._error(`can't read file "${file}"`);

		_this.options.filename = file;

		var processor = new Processor(_this, code);
		processor.run();
	});
};





// Emit an error
Compiler.prototype._error = function(text) {
	this.emit('error', text);
};


// Emit a success
Compiler.prototype._success = function(code) {
	this.emit('success', code);
};
