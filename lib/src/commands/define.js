/*#

#define and #undef commands


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/C-Preprocessor

#*/


// #define command
createCommand("define", function(text) {

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
		text += str.substr(0, str.length - 1) + this.options.endLine;
		str = this.nextLine().trimRight();
	}

	text += str;


	// If there is an '(' after the name: define a macro
	if (isMacro)
		this.createMacro(name, text);

	// Else: create a constant
	else
		this.createConstant(name, text);
});





// #undef command
createCommand("undef", function(text) {
	
	// Get the constant/macro name
	var i = 0;
	while (text.isAlpha(i))
		i++;

	var name = text.substr(0, i);


	// Delete the constant/macro
	delete this.defines[name];
});
