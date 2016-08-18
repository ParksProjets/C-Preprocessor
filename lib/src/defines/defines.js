/*#

Manage defined object like macros and constants


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/C-Preprocessor

#*/



// Add defines object to a line
Processor.prototype.addDefines = function(line) {
	
	// Local variables
	var i1 = -1, i2;
	var d, r;


	// See if the constant is present in the line
	for (var i in this.defines) {

		d = this.defines[i];

		i2 = i.length;
		i1 = -1;

		// It can have the same constant more than one time
		for (;;) {

			// Get the position of the constant (-1 if not present)
			i1 = line.indexOf(i, i1 + 1);
			if (i1 == -1)
				break;

			// Check that the constant isn't in a middle of a word and add the constant if not
			if (line.isAlpha(i1 - 1) || line.isAlpha(i1 + i2))
				continue;

			// Add the macro or the constant
			if (d.count)
				r = this.addMacro(line, i1, d);
			else
				r = this.addConstant(line, i1, d);

			line = r.line;
			i1 = r.index;
			break;
		}
	}

	return line;
};





//# Include js files
#include "constants.js"
#include "macros.js"