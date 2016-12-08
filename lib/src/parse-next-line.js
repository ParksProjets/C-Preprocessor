/*#

Parse the next line


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/C-Preprocessor

#*/


Processor.prototype.parseNext = function() {

	// No more line to parse: stop this function
	if (this.currentLine >= this.linesCount)
		return;


	// Get the line
	var line = this.nextLine(),
		text = line.trimLeft();


	// If the line is empty: apply empty lines limit option
	if (text.length == 0) {
		if (this.options.emptyLinesLimit && this.emptyLines >= this.options.emptyLinesLimit)
			return;

		this.emptyLines++;
		return this.addLine(line);
	}


	// The line starts with a # comment: delete it
	if (this.options.commentEscape && text.startsWith("//#"))
		return;

	if (this.options.commentEscape && text.startsWith("/*#"))
		return this.commentEnd();



	// If the line dosn't start with #
	if (text[0] != '#')
		return this.addLine(this.addDefines(line));


	// Get the # command and the remaing text
	var i = text.indexOf(' '), name;

	if (i != -1) {
		name = text.substr(1, i - 1);
		text = text.substr(i + 1);
	} else {
		name = text.substr(1);
	}



	// Get the # command
	var cmd = Commands[name];

	// If the command exists: call the corresponding function
	if (cmd)
		return cmd.call(this, text);


	// Else: remove the line if 'commentEscape' is enabled
	if (!this.options.commentEscape)
		this.addLine(this.addDefines(line));
};
