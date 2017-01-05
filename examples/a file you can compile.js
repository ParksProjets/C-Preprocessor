/*

This file can be compiled without errors


Sources at https://github.com/ParksProjets/C-Preprocessor
License GPLv2

*/


#include "included file.js"

#define ADD_2(v) v+2


#ifdef OK
	
	console.log('It works !');

#endif


console.log(ADD_2(PI));
