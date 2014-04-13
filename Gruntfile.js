/*
* grunt-jekylls
* https://github.com/djtek/grunt-jekylls
*
* Copyright (c) 2014 Luciano P. Altube
* Licensed under the MIT license.
*/

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
			'Gruntfile.js',
			'tasks/*.js',
			'<%= nodeunit.tests %>',
			],
			options: {
				jshintrc: '.jshintrc',
			},
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp'],
		},
		jekylls: {
			// shared config
			options: {
				ext: '.md', //optional, defaults to markdown
			},
			// data targets
			post: {
				formatter: {
					layout: 'post',
					comments: true
				},
				options: {
					// specific config. Overrides shared options
					src: 'test/_templates/post.txt', //required
					dest: 'tmp/_posts'
				}
			},
			draft: {
				formatter: {
					layout: 'draft'
				},
				options: {
					// specific config. Overrides shared options
					src: 'test/_templates/draft.txt', //required
					dest: 'tmp/_drafts',
					ext: '.txt', //optional, defaults to markdown
				}
			}
		},
		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js'],
		},

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'jekylls:draft:test-draft', 'jekylls:post:test-post', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
