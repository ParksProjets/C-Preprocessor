/*#

#include command


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/C-Preprocessor

#*/


createCommand("include", function(text) {
	var _this = this;
	
	// Get the name of the file to include
	var name = text.getNextString();
	if (!name)
		return this.error('invalid include');
	

	// File to read
	var file = this.path + name;

	// The file is already included and #pragma once
	if (this.parent.includeOnce[file])
		return;


	// Read the file, asynchronous and parse it
	fs.readFile(this.options.basePath + file, 'utf8', function(err, code) {

		if (err)
			return _this.error(`can't read file "${file}"`);

		var p = path.dirname(file);
		p = (p == '.') ? '' : p + '/';

		var processor = new Processor(_this.parent, code);
		processor.currentFile = file;
		processor.path = p;

		// On success: add file content to the result
		processor.onsuccess = function() {

			var e = '';
			for (var i = 0, l = _this.options.includeSpaces; i < l; i++)
				e += _this.options.endLine;

			_this.addLine(e + processor.result.trim() + e);
			_this.next();
		}

		processor.run();
	});


	// Block the synchronous loop
	return false;
});
