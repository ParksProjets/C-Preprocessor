# Compile JS like C
This is a C like preprocessor for Javascript, using Node.js


## Usage

### Like C

```c
#include "file.js"
```
Include and parse a file.


```c
// Define a constant
#define MY_CONST 42

// Define a macro
#define SUM(a,b) a+b
```
Create a constant or a macro.



```c
#undef MY_CONST
```
Delete a constant or a macro.


```c
#ifdef MY_CONST

  // Do stuff
  
#endif
```
Condition: do stuff if the constant is defined



```c
#ifndef MY_CONST

  // Do stuff
  
#endif
```
Condition: do stuff if the constant is undefined


### Extra

```c
//# One line comment

/*#

Multi-line comment

#*/
```
This comments will be delete in the compiled file.



```c
// Here BIT0_B = 0, BIT0_C = 1, BIT0_D = 2, BIT0_E = 3
#enum
  BIT0_B, BIT0_C, BIT0_D, BIT0_E
#endenum
```
C like enumeration.
