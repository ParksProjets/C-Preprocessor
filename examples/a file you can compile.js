/*

This file can be compiled without error

*/


#include "included file.js"

#define ADD_2(v) v+2


#ifdef OK
	
	console.log('It works !');

#endif


console.log(ADD_2(PI));