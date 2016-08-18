/*#

Manage the conditions


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/C-Preprocessor

#*/



// Go to the next #elif, #else or #endif
Processor.prototype.conditionNext = function(end) {
	
	// #if commands to strat a condition
	var ifCmd = ['#if', '#ifdef', '#ifndef'];

	// #else commands
	var elseCmd = ['#elif', '#else'];


	// Local variables
	var line, s, n = 1;


	// Count unexploited condtion
	while (this.currentLine < this.linesCount) {

		line = this.nextLine().trimLeft();
		s = line.split(' ')[0].trim();

		if (ifCmd.indexOf(s) != -1)
			n++;

		else if (!end && n == 1 && elseCmd.indexOf(s) != -1)
			return this.callCondition(line);

		else if (s == "#endif") {
			n--;
			if (n == 0)
				return;
		}
	}
};





// Call a #else or #elif condition
Processor.prototype.callCondition = function(text) {
	
	// Get the command name
	var split = text.split(' '),
		name = split[0].trim().substr(1);

	// Get the remaining text (without the # command)
	split.shift();
	text = split.join(' ').trimLeft();


	// Call the coresponding command
	Commands[name].call(this, text, true);
};





// Go to the end of the condtion (#endif)
Processor.prototype.conditionEnd = function() {
	this.conditionNext(true);
};
