/*#

#define: constants & macros


© 2015 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/Compile-JS-like-C

#*/




// Constants container
var Constantes = {};


// Macro container
var Macro = {};





// Create a macro

function CreateMacro(name, params, content) {

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


	Macro[name] = {
		c: strs,
		n: params.length,
		l: l,
		p: prms,
		f: name + "("
	};

}





// Add constants and macros to a string

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

	for (var i in Macro) {
		
		f = Macro[i];
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


			if (params.length > f.n)
				error('too arguments for macro "' + i + '"');

			if (params.length < f.n)
				error('too few arguments for macro "' + i + '"');
			

			str = f.c[0];
			for (s = 0; s < f.p.length; s++)
				str += params[ f.p[s] ] + f.c[s+1];


			l = l.splice(i1, e-i1+1, str);
			i1 += str.length;
		}
	}


	return l;
}