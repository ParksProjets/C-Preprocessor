/*#

Compiler class


© 2017 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

#*/


var Compiler = function(opt) {

	// Inherit of EventEmitter
	EventEmitter.call(this);


	// Options object
	this.options = {};
	this.options.newLine = '\n';
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


	// List of defined macros/constants
	this.defines = {};

	// Stack for macros/constants
	this.stack = {};

	// List of #pragma once
	this.includeOnce = {};


	// Global constants
	var date = new Date();
	this._compConst('TIME', date.toLocaleTimeString());
	this._compConst('DATE', date.toLocaleDateString());
	this._compConst('LINE', '0');
	this._compConst('FILE', 'main');


	// User defined constants
	var c = opt.constants || {};
	for (var i in c)
		this.createConstant(i, c[i].toString(), false);

	// User defined macros
	var m = opt.macros || {};
	for (var i in m)
		this.createMacro(i, m[i]);
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
