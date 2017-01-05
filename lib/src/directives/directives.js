/*#

Manage the # directives


© 2017 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

#*/


// List of all directives
var Directives = {};



// Create a directive
function createDirective(name, fn) {
	Directives[name] = fn;
}



//# Include all directives
#include "include.js"
#include "define.js"
#include "condition.js"
#include "extra.js"
