/*#

Manage defined objects like macros and constants


© 2017 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

#*/



// Add defined objects to a line
Processor.prototype.addDefines = 
Compiler.prototype.addDefines = function(line, withConst, withMacros) {

	// Local variables
	var i1 = -1, i2;
	var d, r;


	// Check if the constant is present in the line
	for (var i in this.defines) {

		d = this.defines[i];
		
		if (d.count && withMacros === false)
			continue;
		if (!d.count && withConst === false)
			continue;

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
