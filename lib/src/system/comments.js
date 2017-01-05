/*#

Manage the # comments


© 2016 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

#*/


// Go to the end of a multilines comment
Processor.prototype.commentEnd = function() {

	this.currentLine--;
	var line, i;
	
	// Find the end of the comment
	while (this.currentLine < this.linesCount) {
		line = this.nextLine();

		if (line.indexOf("*/") != -1)
			break;
	}
};
