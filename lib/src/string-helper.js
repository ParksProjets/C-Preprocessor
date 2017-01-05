/*#

Some functions for using strings more easily


© 2016 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

#*/



// Return the last character of the string
String.prototype.last = function() {
	return this.slice(-1);
};



// Remove and add some text in the same time
String.prototype.splice = function(idx, rem, s) {
	return (this.slice(0,idx) + s + this.slice(idx + rem));
};



// Get the next "..." string
String.prototype.getNextString = function() {
	var str = this.match(/^"([A-Za-z0-9\-_\. \/\\]+)"/);
	return (!str || !str[1]) ? '' : str[1];
};




// Test if a character is alpha numeric or _
var StringArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

String.prototype.isAlpha = function(i) {
	return StringArray.indexOf(this[i]) != -1;
};
