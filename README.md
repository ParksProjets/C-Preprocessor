Compile JS like C
=================



## Installation

For local installation, run the following command:
```
npm install compile-js-like-c --save
```

For global installation, run the following command:
```
npm install -g compile-js-like-c
```


## Compile a JS file

### In command line
If you have installed this package in global, you can run "compile-like-c" and pass your main file and output file in arguments.
```
compile-like-c mainFile.js outputFile.js
```

### With require()
```js
var compiler = require("compile-js-like-c");

compiler.compile("file.js", [ options, ] function(err, result) {

	if (err)
		return console.log(err);

	console.log(result);
});
```




## Customize options
This are the defaults options. You can modify this by passing an option object in "compiler.compile"
```js
var options = {
	
	// Write numbers in hexadcimal in #enum
	enumHex: true,
	
	// Consider every line stating with '#' as a comment
	commentEscape: true,
	
	// Trim include files
	trimIncludes: true,
	
	// Limits of empty following lines (0 = no limit)
	spaceLineLimit: 0
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
#define SUM(a,b) a+b
```
Create a constant or a macro.


##### Undefine
```c
#undef MY_CONST
```
Delete a constant or a macro.


##### Condition
```c
#ifdef MY_CONST
  // Do stuff
#else
  // Do other stuff
#endif

#ifndef MY_CONST2
  // Do stuff
#endif
```
Condition: do stuff if the constant is defined/undefined



### Extra

##### Comments
```c
//# One line comment

/*#

Multi-line comment

#*/
```
This comments will be delete in the compiled file.


##### Enumeration
```c
// Here BIT0_B = 0, BIT0_C = 1, BIT0_D = 2, BIT0_E = 3
#enum
  BIT0_B, BIT0_C, BIT0_D, BIT0_E
#endenum
```
C like enumeration.