/*

This file works only when compiled with the config file (./configuration.json)


Sources at https://github.com/ParksProjets/C-Preprocessor
License GPLv2

*/


#include "included file.js"


var x = SUM(MY_CONST, 8);

#ifdef OK

	if (x === 50) {
		console.log('It works !');
	}

#endif


console.log(x);
