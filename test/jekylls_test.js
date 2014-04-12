'use strict';
var fs = require('fs'),
	path = require('path'),
	grunt = require('grunt'),
	util = grunt.util,
	async = util.async,
	_ = util._;

/*
======== A Handy Little Nodeunit Reference ========
https://github.com/caolan/nodeunit

Test methods:
test.expect(numAssertions)
test.done()
Test assertions:
test.ok(value, [message])
test.equal(actual, expected, [message])
test.notEqual(actual, expected, [message])
test.deepEqual(actual, expected, [message])
test.notDeepEqual(actual, expected, [message])
test.strictEqual(actual, expected, [message])
test.notStrictEqual(actual, expected, [message])
test.throws(block, [error], [message])
test.doesNotThrow(block, [error], [message])
test.ifError(value)
*/
function parseFileName(name) {
	var parts = name.split('-'),
		date = parts.slice(0,3).join('-'),
		baseName = parts.slice(3).join(' '),
		title = path.basename(baseName, path.extname(baseName));
	
	return {filename: name, data: {title: title, date: date}};
}
exports.jekylls = {
	setUp: function(done) {
		// setup here if necessary
		done();
	},
	test_draft: function (test) {
		var drafts = fs.readdirSync('tmp/_drafts'),
			options = parseFileName(drafts[0]),
			templatePath = path.join(__dirname,'_templates/draft.txt'),
			template = grunt.file.read(templatePath);
		
		test.equal(grunt.file.read(path.join('tmp/_drafts', options.filename)), _.template(template, options.data));
		test.done();
	},
	test_post: function (test) {
		var posts = fs.readdirSync('tmp/_posts'),
			options = parseFileName(posts[0]),
			templatePath = path.join(__dirname,'_templates/post.txt'),
			template = grunt.file.read(templatePath);
		
		test.equal(grunt.file.read(path.join('tmp/_posts', options.filename)), _.template(template, options.data));
		test.done();
	}
};
