# grunt-jekylls

> Jekyll file generator

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jekylls --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jekylls');
```

## The "jekylls" task

### Overview
In your project's Gruntfile, add a section named `jekylls` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jekylls: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.src
Type: `String`
Required

A string value that is used to find a template.

#### options.dest
Type: `String`
Default value: `'/[target]'`

A string value that is used as the destination path for target outputs files.

#### options.ext
Type: `String`
Default value: `'.markdown'`

A string value that is used as the extension for target outputs files.

Note: this options can be passed per target (overriding task options)

#### target.locals
Type: `Object`
Default value: `null`

An object value that will be available inside layouts ````<%= key %>````.

### Usage Examples

#### Default Options
In this example, ````'_templates/post.txt'```` will be copied over to ````_post/yyyy-mm-dd-title-argument.markdown````. In addition, the template will be compiled with title, and date locals.
```js
grunt.initConfig({
	post: {
		options: {
			src: '_templates/post.txt',
		}
	}
});
```

#### Custom Options
In this example, ````'_templates/draft.txt'```` will be copied over to ````_drafts/yyyy-mm-dd-title-argument.txt````. In addition, 
the template will be compiled with title, date, layout, and comments locals.
```js
grunt.initConfig({
	draft: {
		locals: {
			layout: 'draft',
			comments: true
		},
		options: {
			src: '_templates/draft.txt',
			dest: '_drafts', // defaults to '_draft'
			ext: '.txt'
		}
	}
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
