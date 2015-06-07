/*#

Some functions for using string more easily


© 2015 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/Compile-JS-like-C

#*/




// Escape a regexp
function escapeRegExp(str) {
	return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}



// Test if a string start with ...
String.prototype.startsWith = function(str) {
	return this.indexOf(str) === 0;
};



// Return the last character if the string
String.prototype.last = function() {
	return this.slice(-1);
};



// Replace all
String.prototype.replaceAll = function(find, replace) {
	return this.replace(new RegExp(escapeRegExp(find), 'g'), replace);
};



// Remove and add in the same time
String.prototype.splice = function(idx, rem, s) {
	return (this.slice(0,idx) + s + this.slice(idx + rem));
};






// Test if a character is alpha numeric + _

var StringArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

String.prototype.isInSA = function(i) {
	return StringArray.indexOf(this[i]) != -1;
};

function isInSA(c) {
	return StringArray.indexOf(c) != -1;
}

