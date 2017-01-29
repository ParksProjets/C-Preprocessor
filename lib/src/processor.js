/*#

Processor class


© 2017 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

#*/


var Processor = function(parent, code) {

	// Parent compiler
	this.parent = parent;
	this.options = parent.options;


	// List of defined macros/constants & stack
	this.defines = parent.defines;
	this.stack = parent.stack;

	// Is the processor running ?
	this.running = false;


	// Code & result text
	this.code = code;
	this.result = '';

	// Number of empty lines
	this.emptyLines = 0;

	// Current line & file
	this.currentLine = 0;
	this.currentFile = this.options.filename || 'main';
	this._compConst('FILE', this.currentFile);

	// Current path
	var p = path.dirname(this.currentFile);
	this.path = (p == '.') ? '' : p + '/';


	// Bind some functions
	this.parseNext = this.parseNext.bind(this);
	this.next = this.next.bind(this);
};



// Constructor
Processor.prototype.constructor = Processor;




// Run the processor
Processor.prototype.run = function() {
	var _this = this;

	// Set the processor as running
	this.running = true;
	

	// Get an array of all lines
	var lines = this.code.split(/\r?\n/);
	this.linesCount = lines.length;

	// Return the next line
	function nextLine() {
		_this._compConst('LINE', _this.currentLine+1);
		return lines[_this.currentLine++];
	}

	this.nextLine = nextLine;


	// Parse the first line
	this.next();
};




// Parse the next lines (doing it synchronously until an asynchronous command)
Processor.prototype.next = function() {

	var running = true;
	while (this.running && running && this.currentLine < this.linesCount)
		running = (this.parseNext() !== false);

	if (this.running && running && this.currentLine >= this.linesCount)
		this.success();
};




// Append a line to the result
Processor.prototype.addLine = function(line) {
	this.result += line + this.options.newLine;
	this.emptyLines = 0;
};






// Emit an error
Processor.prototype.error = function(msg) {
	if (this.options.stopOnError)
		this.running = false;

	msg = `(line ${this.currentLine} in "${this.currentFile}") ${msg}`;
	this.parent._error(msg);

	return !this.options.stopOnError;
};



// Emit the success
Processor.prototype.success = function() {
	this.running = false;

	if (this.onsuccess)
		this.onsuccess();
	else
		this.parent._success(this.result);
};
