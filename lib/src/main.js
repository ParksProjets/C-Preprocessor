/*

C Preprocessor


© 2017 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

*/


// Libraries
var EventEmitter = require('events'),
	fs = require("fs"),
	path = require("path");



//# Includes all js files
#include "string-helper.js"
#include "compiler.js"
#include "processor.js"
#include "parse-next-line.js"
#include "system/defines.js"
#include "system/stack.js"
#include "system/conditions.js"
#include "system/comments.js"
#include "directives/directives.js"
