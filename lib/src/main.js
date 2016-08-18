/*

C Preprocessor


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/C-Preprocessor

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
#include "defines/defines.js"
#include "defines/conditions.js"
#include "defines/comments.js"
#include "commands/commands.js"
