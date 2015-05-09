/*

Compile JS like C


© 2015 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/Compile-JS-like-C

*/



var fs = require("fs");

var startTime = Date.now();
var spaceLines = 0;


var Options = {

	main: "main.js",

	output: "z80.js",

	enumHex: true,

	commentEscape: true,

	trimIncludes: true,

	spaceLineLimit: 0

};





// Errors

function Error(msg) {
	console.log(msg);
	process.exit(1);
}



// String prototype

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

String.prototype.startsWith = function (str) {
	return this.indexOf(str) === 0;
};

String.prototype.last = function() {
	return this.slice(-1);
};

String.prototype.replaceAll = function(find, replace) {
	return this.replace(new RegExp(escapeRegExp(find), 'g'), replace);
};

String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + rem));
};



var StringArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

String.prototype.isInSA = function(i) {
    return StringArray.indexOf(this[i]) != -1;
};

function isInSA(c) {
	return StringArray.indexOf(c) != -1;
}







// Constantes

var Constantes = {};

var Functions = {};



// Create a macro

function AddFunction(name, params, content) {

	var breaks = [];


	for (var i = 0; i < params.length; i++) {

		var i1 = -1, p = params[i], i2 = p.length;

		for(;;) {
			i1 = content.indexOf(p, i1+1);
			if (i1 == -1)
				break;

			if (content.isInSA(i1-1) || content.isInSA(i1+i2))
				continue;

			breaks.push([ i1, i, i2 ]);
		}
	}


	breaks.sort(function(a, b) {
		return a[0] - b[0]
	});


	var offset = 0;
	var strs = [], prms = [];
	var i, l = 0;

	for (i = 0; i < breaks.length; i++) {
		strs[i] = content.slice(offset, breaks[i][0]);
		l += strs[i].length;

		offset = breaks[i][0] + breaks[i][2];
		prms[i] = breaks[i][1];
	}

	strs[i] = content.slice(offset);


	Functions[name] = {
		c: strs,
		n: params.length,
		l: l,
		p: prms,
		f: name + "("
	};

}





// Add constantes and macro to a string

function addConstantes(l) {

	var i1 = -1, i2;

	for (var i in Constantes) {

		i2 = i.length;
		i1 = -1;

		for (;;) {
			i1 = l.indexOf(i, i1+1);
			if (i1 == -1)
				break;

			if (!l.isInSA(i1-1) && !l.isInSA(i1+i2)) {
				l = l.splice(i1, i2, Constantes[i]);
				i1 += Constantes[i].length;
			}
		}
	}



	var f, str = '';

	for (var i in Functions) {
		
		f = Functions[i];
		i2 = f.f.length;
		i1 = -1;

		for (;;) {
			i1 = l.indexOf(f.f, i1+1);
			if (i1 == -1)
				break;

			if (l.isInSA(i1-1))
				continue;

			var m = 0, s = i1+i2, e = s;
			var params = [];

			for(; l[e] !== undefined; e++) {
				
				if (l[e] == "(")
					m++;

				else if (l[e] == "," && !m) {
					params.push(l.slice(s, e))
					s = e+1;
				}

				else if (l[e] == ")") {
					if (!m)
						break;
					m--;
				}
			}

			params.push(l.slice(s, e));


			if (params.length != f.n)  {
				Error("Macro length");
			}

			str = f.c[0];
			for (s = 0; s < f.p.length; s++)
				str += params[ f.p[s] ] + f.c[s+1];


			l = l.splice(i1, e-i1+1, str);
			i1 += str.length;
		}
	}


	return l;
}







// Parse a file

function ParseFile(fileName) {

	var txt = fs.readFileSync(fileName),
		array = txt.toString().split('\n'),
		index = 0;


	var result = '';

	var l, str = '', cur = 0;


	function nextLine() {
		return array[index++];
	}




	/**  Functions of types  **/

	var TypesFunc = {};


	TypesFunc["define"] = function() {

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
			AddFunction(name, params, content.trim());
		else
			Constantes[name] = content.trim();

	};



	TypesFunc["undef"] = function() {
		var name = str.match(/^[A-Za-z0-9_]+/)[0];
		delete Constantes[name];
		delete Functions[name];
	};



	TypesFunc["include"] = function() {
		var name = str.match(/^"([A-Za-z0-9\-_\. ]+)"/)[1];
		result += ParseFile(name);
	};



	TypesFunc["ifndef"] = function() {
		var name = str.match(/^[A-Za-z0-9_]+/)[0];

		if (Constantes[name] != undefined || Functions[name] != undefined)
			condition();
	};



	TypesFunc["ifdef"] = function() {
		var name = str.match(/^[A-Za-z0-9_]+/)[0];

		if (Constantes[name] == undefined && Functions[name] == undefined)
			condition();
	};
	


	TypesFunc["enum"] = function() {
		enumeration();
	};








	// Parse a comment
	function comment() {

		var line;

		for(;;) {
			line = nextLine();
			if (line === undefined || line.trimLeft().startsWith("#*/"))
				break;
		}
	}



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

			else if (line.startsWith("#endif")) {
				n--;
				if (!n) return;
			}
		}
	}



	// Parse an ennumeration
	function enumeration() {

		var line, str = '';

		for(;;) {
			line = nextLine();
			if (line === undefined || line.startsWith("#endenum"))
				break;

			str += line;
		}

		str.split(',').forEach(function(c, i) {
			Constantes[ c.trim() ] = Options.enumHex ? '0x'+i.toString(16) : i.toString(16);
		});
	}









	// Parse line by line
	
	while ( (l = nextLine()) !== undefined ) {


		str = l.trimLeft();

		if (!str.length) {
			if (Options.spaceLineLimit && spaceLines >= Options.spaceLineLimit)
				continue;

			spaceLines++;
			result += '\r\n';
			continue;
		}



		if (Options.commentEscape && str.startsWith("//#"))
			continue;

		if (Options.commentEscape && str.startsWith("/*#")) {
			comment();
			continue;
		}


		var type = str.match(/^#([A-Za-z0-9_]+)/);
		type = type && type[1] ? type[1] : 0;


		if (!type) {
			result += addConstantes(l);
			spaceLines = 0;
			continue;
		}


		str = str.substr(type.length + 1).trimLeft();


		if (TypesFunc[type])
			TypesFunc[type]();

		else if (!Options.commentEscape) {
			result += addConstantes(l);
			spaceLines = 0;
		}

	}


	if (Options.trimIncludes)
		return result.trim();
	else
		return result;
}





fs.writeFileSync(Options.output, ParseFile(Options.main));

console.log("Done in %ss", (Date.now() - startTime) / 1000);
