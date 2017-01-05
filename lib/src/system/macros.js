/*#

#define a macro


© 2016 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

#*/


// Create a macro (text must have the macro arguments, like this: '(a,b) a+b')
Processor.prototype.createMacro =
Compiler.prototype.createMacro = function(name, text) {

	// First, get macro arguments
	var args = [];

	var end = text.indexOf(")"),
		i1 = 1,
		i2 = 0;


	// If there is no closing parenthesis
	if (end == -1)
		return this.error(`no closing parenthesis in the #define of marcro ${name}`);
	

	// Get arguments
	while( (i2 = text.indexOf(",", i2 + 1)) != -1 && i2 < end) {
		args.push(text.substring(i1, i2).trim());
		i1 = i2 + 1;
	}

	args.push(text.substring(i1, end));


	// Remove arguments in the text
	text = text.substr(end + 1).trimLeft();

	// Execute defined macros
	text = this.addDefines(text, false, true);


	// Secondly, makes breaks and store variables positions
	var breaks = [];

	for (var i = 0, l = args.length, p; i < l; i++) {

		i1 = -1;
		p = args[i];
		i2 = p.length;

		for(;;) {
			i1 = text.indexOf(p, i1+1);
			if (i1 == -1)
				break;

			if (text.isAlpha(i1-1) || text.isAlpha(i1+i2))
				continue;

			breaks.push([ i1, i, i2 ]);
		}
	}


	// Sort variables in order of their positions in the macro text
	breaks.sort(function(a, b) {
		return a[0] - b[0]
	});



	// Thirdly, cut the text into parts without variable and add defined constants
	var offset = 0,
		content = [],
		pos = [];
		i = 0;

	for (; i < breaks.length; i++) {
		content[i] = this.addDefines(text.slice(offset, breaks[i][0]), true, false);
		offset = breaks[i][0] + breaks[i][2];
		pos[i] = breaks[i][1];
	}

	content[i] = this.addDefines(text.slice(offset));



	// Fourthly, store the macro
	this.defines[name] = {
		content: content,
		count: args.length,
		pos: pos,
		name: name
	};
};








// Read a line and transform macro by adding their value
Processor.prototype.addMacro =
Compiler.prototype.addMacro = function(line, i, macro) {

	// Local variables
	var m = 0,
		e = i + macro.name.length,
		s = e,
		l = 0,
		args = [];


	// Get arguments between parenthesis (by counting parenthesis)
	for (var v, l = line.length; e < l; e++) {

		v = line[e];

		if (v == "(") {
			m++;
			if (m == 1)
				s = e + 1;
		}

		else if (v == "," && m == 1) {
			args.push(line.slice(s, e));
			s = e + 1;
		}

		else if (v == ")") {
			if (m == 1)
				break;
			m--;
		}

		else if (v != ' ' && m == 0) {
			return this.error(`there is no openning parenthesis for macro ${macro.name}`);
		}
	}


	// If the closing parenthesis is missing
	if (m != 1)
		return this.error(`the closing parenthesis is missing for macro ${macro.name}`);

	// Add the last argument
	args.push(line.slice(s, e));


	// Check if there is the right number of arguments
	if (args.length > macro.count)
		return this.error(`too many arguments for macro ${macro.name}`);

	if (args.length < macro.count)
		return this.error(`too few arguments for macro ${macro.name}`);
	

	// Execute 'addDefines' on each argument
	for (var j = 0; j < macro.count; j++)
		args[j] = this.addDefines(args[j]);


	// Replace macro variables with the given arguments
	var str = macro.content[0];

	for (s = 0, l = macro.pos.length; s < l; s++)
		str += args[ macro.pos[s] ] + macro.content[s+1];


	// Add the result into the line
	line = line.splice(i, e - i + 1, str);
	i += str.length;

	return { line: line, index: i };
};
