/*#

#pragma, #error and #enum directives


© 2017 -
	Guillaume Gonnet
	Al Zohali

License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

#*/


// #pragma directive
createDirective("pragma", function(text) {
	
	text = text.trim();


	// #pragma once: include a file once
	if (text == 'once')
		this.parent.includeOnce[this.currentFile] = true;


	// #pragma push_macro(...): save value of a macro on top of the stack
	else if (text.startsWith('push_macro')) {

		var match = text.match(/push_macro\("([^"]+)"\)/);
    	
    	if (match === null || match[1].length == 0)
			this.error(`wrong pragma format`);
		else
			this.pushMacro(match[1]);
	}


	// #pragma pop_macro(...): set value of the a macro to saved value
	else if (text.startsWith('pop_macro')) {

		var match = text.match(/pop_macro\("([^"]+)"\)/);
		
		if (match === null || match[1].length == 0)
			this.error(`wrong pragma format`);
		else
			this.popMacro(match[1]);
	}


	// Else: error
	else
		this.error(`unknown pragma "${text}"`);
});





// #error directive
createDirective("error", function(text) {
	this.error(text.trim());
});






// #enum directive: c like enumeration
createDirective("enum", function(text) {

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



// #endenum directive
createDirective("endenum", function() {
	// Do nothing beacause this directive is already evaluated by #enum
});
