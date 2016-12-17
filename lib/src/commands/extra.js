/*#

#pragma, #error and #enum command


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/C-Preprocessor

#*/


// #pragma command
createCommand("pragma", function(text) {
	
	text = text.trim();

	// #pragma once: include a file once
	if (text == 'once')
		this.parent.includeOnce[this.currentFile] = true;

	// Else: error
	else
		this.error(`unknown pragma "${text}"`);
});





// #error command
createCommand("error", function(text) {
	this.error(text.trim());
});






// #enum command: c like enumeration
createCommand("enum", function(text) {

	// Get the enum options
	text = text.replace(/=/g, ':');

	try {
		eval(`var opt = { ${text} }`);
	} catch(e) {
		var opt = {};
	}


	// Default options
	opt.start = opt.start || 0;
	opt.step = opt.step || 1;


	// Get all names of constants to create
	var line, str = '';

	while (this.currentLine < this.linesCount) {
		line = this.nextLine();
		if (line.trimLeft().startsWith("#endenum"))
			break;

		str += line;
	}


	// Create an array of constant names
	var split = str.split(','),
		name, v;

	// Create the constants and add their value
	for (var i = 0, l = split.length; i < l; i++) {

		name = split[i].trim();
		v = opt.start + i * opt.step;

		this.defines[name] = {
			value: this.options.enumInHex ? '0x'+v.toString(16) : v.toString(),
			name: name
		};
	}
});



// #endenum command
createCommand("endenum", function() {
	// Do nothing beacause this command is already evaluated by #enum
});
