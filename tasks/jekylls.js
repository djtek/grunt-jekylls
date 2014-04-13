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
	fail = grunt.fail,
	util = grunt.util,
	_ = util._;

function dasherizeStamp(date) {
	return [date.getFullYear(), date.getMonth()+1, date.getDate()].join('-');
}

module.exports = function(grunt) {
	grunt.registerMultiTask('jekylls', "testing multi", function (title) {		
		if (!title) {
			var target = log.wordlist([this.name, this.target], {separator: ':', color: 'cyan'});
			log.errorlns('Title required');
			return false;
		}
		
		var date = new Date(),
			dasherizedStamp = dasherizeStamp(date),
			fname = [dasherizedStamp,title].join('-'),
			_title = title.replace(/[-_]/g, ' ');
		
		var defaults = {
			expand: true,
			cwd: '.',
			extDot: 'first',
			flatten: true,
			rename: function (dest, src) {
				fname = path.join(dest, fname + path.extname(src));
				if (grunt.file.exists(fname)) {
					fail.warn(fname + ' already exists');
				}
				return fname;
			}				
		};
		
		var locals = this.data.locals||{};
		
		// extend options with defaults and data options
		var options = _.extend({
				dest: '_' + this.target,
				ext: '.markdown'
			}, this.options(this.data.options));

		_.extend(options, defaults);
				
		grunt.loadNpmTasks('grunt-contrib-copy');
		grunt.config('copy.' + this.target, { files: [options] });
		
		grunt.registerTask('processTemplate', function () {
			log.writeln('Processing:', log.wordlist([fname], {color: 'cyan'}));
			var template = grunt.file.read(fname);
			var data = _.extend(locals, {
				title: _title, 
				date: dasherizedStamp
			});
			grunt.file.write(fname, _.template(template)(data));
		});
		
		log.writeln('Generating jekyll ' + this.target);
		grunt.task.run('copy:' + this.target, 'processTemplate');
		
	});
};
