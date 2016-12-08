/*#

Processor class


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/C-Preprocessor

#*/


var Processor = function(parent, code) {

	// Parent compiler
	this.parent = parent;
	this.options = parent.options;


	// Defined objects
	this.defines = parent.defines;

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
	var lines = this.code.split('\n');
	this.linesCount = lines.length;

	// Return the next line
	function nextLine() {
		return lines[_this.currentLine++];
	}

	this.nextLine = nextLine;


	// Parse the first line
	this.next();
};




// Parse the next lines (doing it synchronous until an assynchronous command)
Processor.prototype.next = function() {
	
	var running = true;
	while (this.running && running && this.currentLine < this.linesCount)
		running = (this.parseNext() !== false);

	if (this.running && running && this.currentLine >= this.linesCount)
		this.success();
};




// Append a line to the result
Processor.prototype.addLine = function(line) {
	this.result += line + this.options.endLine;
	this.emptyLines = 0;
};






// Emit an error
Processor.prototype.error = function(msg) {
	if (this.options.stopOnError)
		this.running = false;

	msg = `(line ${this.currentLine} in "${this.currentFile}") ${msg}`;
	this.parent._error(msg);
};



// Emit the success
Processor.prototype.success = function() {
	this.running = false;

	if (this.onsuccess)
		this.onsuccess();
	else
		this.parent._success(this.result);
};
