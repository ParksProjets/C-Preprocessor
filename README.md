C Preprocessor
===============

C Preprocessor is a Javascript preprocessor running like a C preprocessor with # commands.  
See changelog [here](../master/CHANGELOG.md).


## Installation

For local installation, run the following command:
```
npm install c-preprocessor --save
```

For global installation, run the following command:
```
npm install -g c-preprocessor
```


## Compile a JS file

### In command line
If you have installed this package in global, you can run "compile-like-c" and pass your main file and output file in arguments.
```
c-preprocessor mainFile.js outputFile.js
```

### With require()
```js
var compiler = require("c-preprocessor");


// To compile a file
compiler.compileFile(fileName, [ options, ] function(err, result) {

	if (err)
		return console.log(err);

	console.log(result);
});


// To compile a text
compiler.compile(code, [ options, ] function(err, result) {
	// ...
});


// Or use Compiler class
var c = new compiler.Compiler([options]);
c.on('success', /* ... */)
c.on('error', /* ... */)

c.compile(code);
// or
c.compileFile(fileName);
```




## Customize options
This are the defaults options. You can modify this by passing an option object
```js
var options = {

	// End of line character
	endLine: '\n',

	// Escape '//#' & '/*#' comments (see extra/comments)
	commentEscape: true,
	
	// Empty lines to add between code and included files
	includeSpaces: 1,
	
	// Limit of empty following lines (0 = no limit)
	emptyLinesLimit: 0,

	// Base path for including files
	basePath: './',

	// Stop the compiler when an error ocurred ?
	stopOnError: true,

	// Constants in #enum command must be in hexadecimal ?
	enumInHex: true
};
```




## Usage

### Like a C preprocessor

##### Include
```c
#include "file.js"
```
Include and parse a file.


##### Define
```c
// Define a constant
#define MY_CONST 42

// Define a macro
#define SUM(a,b) a + b
```
Create a constant or a macro.


##### Undefine
```c
#undef MY_CONST
```
Delete a constant or a macro.


##### Condition
```c
#if A + B == 5 && defined(MY_CONST)
  // Do stuff
#elif !defined(MY_CONST2)
  // Do other stuff
#else
  // Do other stuff
#endif

#ifndef MY_CONST2
  // Do stuff
#endif
```
Condition: C like conditions.  
Note: *#ifdef C* and *#ifndef C* are faster than *#if defined(C)* and *#if !defined(C)*.


##### Pragma once
```c
#pragma once
```
Include the current file once.


### Extra

##### Comments
```c
//# One line comment

/*#

Multi-line comment

#*/
```
This comments will be delete in the compiled file.  
Note: `options.commentEscape` must be `true`.


##### Enumeration
```c
// Here A=0, ..., D=3
#enum
  A, B, C, D
#endenum

// With options, so Car=5, .., Truck=25
#enum start=5, step=10
  Car, Bike, Truck
#endenum
```
C like enumeration. Use this command for creating a lot of constants.