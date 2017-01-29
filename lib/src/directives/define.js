/*#

#define and #undef directives


© 2017 -
	Guillaume Gonnet
	Al Zohali

License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

#*/


// #define directive
createDirective("define", function(text) {

	// Get the constant/macro name
	var i = 0;
	while (text.isAlpha(i))
		i++;

	var name = text.substr(0, i),
		isMacro = text[i] == '(';

	text = text.substr(name.length).trimLeft();


	// Read a multilines constants/macro if there is an '\' at the end of the line
	var str = text.trimRight();
	text = '';

	while (str.last() == "\\") {
		text += str.substr(0, str.length - 1) + this.options.newLine;
		str = this.nextLine().trimRight();
	}

	text += str;


	// Strip comments from the definition
	var posBegin;
	var posEnd;

	while ((posBegin = text.indexOf('/*')) != -1) {
		posEnd = text.indexOf('*/', 1 + posBegin);
		if (posEnd == -1)
			posEnd = text.length;

		text = text.substring(0, posBegin) + ' ' + text.substring(2 + posEnd);
	}

	if ((posBegin = text.indexOf('//')) != -1)
		text = text.substring(0, posBegin) + ' ';

	text.trimRight();


	// If there is an '(' after the name: define a macro
	if (isMacro)
		this.createMacro(name, text);

	// Else: create a constant
	else
		this.createConstant(name, text);
});





// #undef directive
createDirective("undef", function(text) {

	// Get the constant/macro name
	var i = 0;
	while (text.isAlpha(i))
		i++;

	var name = text.substr(0, i);


	// Delete the constant/macro
	delete this.defines[name];
});
