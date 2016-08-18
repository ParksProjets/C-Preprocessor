/*#

Manage the # commands


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/C-Preprocessor

#*/


// List of all commands
var Commands = {};



// Create a command
function createCommand(name, fn) {
	Commands[name] = fn;
}



//# Include all commands
#include "include.js"
#include "define.js"
#include "condition.js"
#include "extra.js"
