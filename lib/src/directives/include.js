/*#

#include directive


© 2016 - Guillaume Gonnet
License GPLv2

Sources at https://github.com/ParksProjets/C-Preprocessor

#*/


createDirective("include", function(text) {
	var _this = this;

	// Get the name of the file to include
	var name = text.getNextString();
	if (!name)
		return this.error('invalid include');


	// File to read
	var file = this.path + name;

	// If the file is already included and #pragma once
	if (this.parent.includeOnce[file])
		return;


	// Read the file asynchronously and parse it
	fs.readFile(this.options.basePath + file, 'utf8', function(err, code) {

		if (err)
			return _this.error(`can't read file "${file}"`);

		_this.options.filename = file;
		var processor = new Processor(_this.parent, code);

		// On success: add the file content to the result
		processor.onsuccess = function() {
			processor.onsuccess = null;

			var e = '';
			for (var i = 0, l = _this.options.includeSpaces; i < l; i++)
				e += _this.options.newLine;

			_this.addLine(e + processor.result.trim() + e);

			_this._compConst('FILE', _this.currentFile);
			_this.next();
		};

		processor.run();
	});


	// Block the synchronous loop
	return false;
});
