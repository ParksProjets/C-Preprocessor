/*

Compile JS like C


© 2015 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/Compile-JS-like-C

*/



// Options

var Options = {

	enumHex: true,

	commentEscape: true,

	trimIncludes: true,

	spaceLineLimit: 0
};




// Requires
var fs = require("fs"),
	path = require("path");




//# Helper for string
#include "string-helper.js"




// Globals variables

var spaceLines = 0;

var currentLine = 0;
var currentFile = null;

var basePath = "";
var currentPath = "";






// Error manager

function error(msg) {

	if (currentFile)
		msg = '(line ' + currentLine + ' in "' + currentFile + '") ' + msg;

	throw(msg);
}




//# Constants & macros
#include "defines.js"





// Parse a file

function ParseFile(fileContent, isContent) {

	// Read file if fileContent is a file name
	if (!isContent) {

		try {
			var txt = fs.readFileSync(basePath + fileContent);
		} catch(e) {
			error('can\'t read file "' + fileContent + '"');
		}


		currentPath = path.dirname(fileContent);

		if (currentPath == ".")
			currentPath = "";
		else
			currentPath += "/";

	} else {
		var txt = fileContent;
	}



	// Current file and line
	if (isContent)
		currentFile = "main";
	else
		currentFile = fileContent;


	currentLine = 0;
	

	var array = txt.toString().split('\n'),
		index = 0;


	var result = '';

	var l, str = '', cur = 0;


	function nextLine() {
		currentLine++;
		return array[index++];
	}



	//# Include # commands
	#include "command-func.js"




	// Parse line by line
	
	while ( (l = nextLine()) !== undefined ) {


		str = l.trimLeft();

		// The line is empty
		if (!str.length) {
			if (Options.spaceLineLimit && spaceLines >= Options.spaceLineLimit)
				continue;

			spaceLines++;
			result += l + '\n';
			continue;
		}



		// The line start with a comment to delete
		if (Options.commentEscape && str.startsWith("//#"))
			continue;

		if (Options.commentEscape && str.startsWith("/*#")) {
			comment();
			continue;
		}


		var type = str.match(/^#([A-Za-z0-9_]+)/);
		type = type && type[1] ? type[1] : 0;


		if (!type) {
			result += addConstantes(l) + '\n';
			spaceLines = 0;
			continue;
		}


		str = str.substr(type.length + 1).trimLeft();


		// The line is a command
		if (CommandFunc[type])
			CommandFunc[type]();

		else if (!Options.commentEscape) {
			result += addConstantes(l);
			spaceLines = 0;
		}

	}


	// Trim or not the file
	if (Options.trimIncludes)
		return result.trim();
	else
		return result;
}










// Entry point

function StartParsing(fileContent, isContent) {

	if (isContent)
		return ParseFile(fileContent, true);


	basePath = (path.dirname(fileContent) || ".") + "/";

	var fileName = path.basename(fileContent);

	return ParseFile(fileName);
}






// Exports

module.exports = {
	p: StartParsing,
	o: Options
};