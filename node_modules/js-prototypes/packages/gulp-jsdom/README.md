# gulp-jsdom 
[![](https://img.shields.io/npm/v/gulp-jsdom.svg)](https://www.npmjs.com/package/gulp-jsdom) [![](https://david-dm.org/SARFEX/gulp-jsdom.svg)](https://david-dm.org/SARFEX/gulp-jsdom) [![](https://img.shields.io/github/stars/sarfex/gulp-jsdom.svg?style=social&label=Github)](https://github.com/SARFEX/gulp-jsdom) 




> Manipulate DOM with [jsdom](https://www.npmjs.com/package/jsdom)@latest 



## Installation

`npm install gulp-jsdom`

## Simple Example (gulp 4.0.2)

```javascript
const { src, dest } = require("gulp");
const dom = require("gulp-jsdom");

function html() {
	return src("./src/index.html")
	.pipe(dom(document => {
		document.body.innerHTML = "Hello!";
	}))
	.pipe(dest("./public/"));
}
```

## Simple Example (gulp 3.9.1)

```javascript
const gulp = require("gulp");
const dom = require("gulp-jsdom");

gulp.task("html", function () {
	return gulp.src("./src/index.html")
	
	.pipe(dom(function(document){
		document.body.innerHTML = "Hello!";
	}))
	
	.pipe(gulp.dest("./public/"));
});
```

## More Features

```javascript
// ...
.pipe(dom(function(document, window){
	
	document;
	window;
	
	this.filename; // current filename
	this.file; // current file buffer
	
}), { 
	/* jsdom options here */
}, false) // serialize off

```

## API

### dom(mutator [, options, serialize])

#### mutator

Type: `Function`

Manipulate DOM here! >:D


#### options

Type: `Object`
Default: `{}`

jsdom options [read more](https://www.npmjs.com/package/jsdom)


#### serialize

Type: `Boolean`
Default: `true`

[More information about serialize](https://www.npmjs.com/package/jsdom#serializing-the-document-with-serialize)


## Thank you