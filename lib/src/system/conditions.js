/*#

Manage the conditions


© 2017 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

#*/


// Go to the next #elif, #else or #endif
Processor.prototype.conditionNext = function(end) {
	
	// #if directives to start a condition
	var ifCmd = ['if', 'ifdef', 'ifndef'];

	// #else directives
	var elseCmd = ['elif', 'else'];


	// Local variables
	var line, s, n = 1;


	// Count unexploited conditions
	while (this.currentLine < this.linesCount) {

		line = this.nextLine().trimLeft();
		if (line[0] != '#')
			continue;

		s = line.substr(1).trimLeft().split(' ')[0];

		if (ifCmd.indexOf(s) != -1)
			n++;

		else if (!end && n == 1 && elseCmd.indexOf(s) != -1)
			return this.callCondition(line);

		else if (s == "endif") {
			n--;
			if (n == 0)
				return;
		}
	}
};





// Call a #else or #elif condition
Processor.prototype.callCondition = function(text) {
	
	// Get the directive name
	var split = text.substr(1).trimLeft().split(' '),
		name = split[0];

	// Get the remaining text (without the # directive)
	split.shift();
	text = split.join(' ').trimLeft();


	// Call the corresponding directive
	Directives[name].call(this, text, true);
};





// Go to the end of the condtion (#endif)
Processor.prototype.conditionEnd = function() {
	this.conditionNext(true);
};
