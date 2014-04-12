/*
* grunt-jekylls
* https://github.com/djtek/grunt-jekylls
*
* Copyright (c) 2014 Luciano P. Altube
* Licensed under the MIT license.
*/

'use strict';
// deps
var path = require('path'),
	grunt = require('grunt'),
	log = grunt.log,
	util = grunt.util,
	_ = util._;

function dasherizeStamp(date) {
	return [date.getFullYear(), date.getMonth(), date.getDate()].join('-');
}

module.exports = function(grunt) {
	grunt.registerMultiTask('jekylls', "testing multi", function (title) {		
		if (!title) {
			var target = log.wordlist([this.name, this.target], {separator: ':', color: 'cyan'});
			log.writeln(target, '>> title required');
			return false;
		}
		
		var date = new Date(),
			dasherizedStamp = dasherizeStamp(date),
			fname = [dasherizedStamp,title].join('-'),
			_title = title.replace(/[-_]/g, ' ');
		
		// extend options with defaults and data options
		var options = grunt.util._.extend({
			dest: '_' + this.target,
			ext: '.markdown',
			rename: function (dest, src) {
				fname = path.join(dest, fname + path.extname(src));
				return fname;
			}
		}, this.options(this.data.options));
				
		grunt.loadNpmTasks('grunt-contrib-copy');
		grunt.config('copy.' + this.target, { files: [options] });
		
		grunt.registerTask('processTemplate', function () {
			log.writeln('Processing:', log.wordlist([fname], {color: 'cyan'}));
			var template = grunt.file.read(fname);
			grunt.file.write(fname, _.template(template)({title: _title, date: dasherizedStamp}));
		});
		
		log.writeln('Generating jekyll ' + this.target);
		grunt.task.run('copy:' + this.target, 'processTemplate');
		
	});
};
