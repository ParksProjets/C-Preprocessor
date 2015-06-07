/*#

Function for # command


© 2015 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/Compile-JS-like-C

#*/




// Container
var CommandFunc = {};




// Parse a  /*# comment
function comment() {

	var line;

	for(;;) {
		line = nextLine();

		if (line === undefined || line.trimLeft().startsWith("#*/"))
			break;
	}
}






// #define:  create a constant / macro

CommandFunc["define"] = function() {

	var name = str.match(/^[A-Za-z0-9_]+/)[0];
	str = str.substr(name.length).trimLeft();


	var func = false;

	if (str.search(/^\([A-Za-z0-9_,]+\)/) != -1) {
		func = true;

		var i1 = str.indexOf(")"), i2 = 1, i3 = 0;
		var params = [];

		while( (i3 = str.indexOf(",", i2+1)) != -1 ) {
			params.push(str.substr(i2, i3 - i2));
			i2 = i3+1;
		}

		params.push(str.substr(i2, i1 - i2));

		str = str.substr(i1+1).trimLeft();
	}


	var content = '';
	str = str.trimRight();

	while (str.last() == "\\") {
		content += str.substr(0, str.length - 1) + '\n';
		str = nextLine().trimRight();
	}
	content += str;

	content = addConstantes(content);


	if (func)
		CreateMacro(name, params, content.trim());
	else
		Constantes[name] = content.trim();

};








// #undef: delete a constant / macro

CommandFunc["undef"] = function() {
	var name = str.match(/^[A-Za-z0-9_]+/)[0];
	delete Constantes[name];
	delete Functions[name];
};







// #include: include and parse a file

CommandFunc["include"] = function() {
	
	var l = currentLine,
		f = currentFile,
		p = currentPath;

	var name = str.match(/^"([A-Za-z0-9\-_\. \/\\]+)"/);
	if (!name || !name[1])
		error("invalid include");

	result += ParseFile(currentPath + name[1]) + '\r\n';

	currentLine = l;
	currentFile = f;
	currentPath = p;
};









// #ifndeff / #ifdef: conditon

CommandFunc["ifndef"] = function() {
	var name = str.match(/^[A-Za-z0-9_]+/)[0];

	if (Constantes[name] != undefined || Functions[name] != undefined)
		condition();
};


CommandFunc["ifdef"] = function() {
	var name = str.match(/^[A-Za-z0-9_]+/)[0];

	if (Constantes[name] == undefined && Functions[name] == undefined)
		condition();
};


CommandFunc["endif"] = CommandFunc["else"] = function() {
	// Escape the line
};



// Parse a condition
function condition() {

	var line, n = 1;

	for(;;) {
		line = nextLine();

		if (line === undefined)
			return;

		line = line.trim();

		if (line.startsWith("#ifdef") || line.startsWith("#ifndef"))
			n++;

		else if (line.startsWith("#else") && n == 1)
			return;

		else if (line.startsWith("#endif")) {
			n--;
			if (!n) return;
		}
	}
}








// #enum: c like enumeration

CommandFunc["enum"] = function() {
	
	var line, str = '';

	for(;;) {
		line = nextLine();
		if (line === undefined || line.trimLeft().startsWith("#endenum"))
			break;

		str += line;
	}

	str.split(',').forEach(function(c, i) {
		Constantes[ c.trim() ] = Options.enumHex ? '0x'+i.toString(16) : i.toString();
	});
};