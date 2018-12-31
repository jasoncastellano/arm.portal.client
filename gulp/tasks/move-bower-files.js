'use strict';

var gulp = require('gulp');
var mainBowerFiles = require("main-bower-files");
var helper = require('../helpers');
var $ = helper.plugins;

module.exports = moveBowerFiles;

/**
 * Copies bower dependencies to target dest directory
 *
 * @returns {Pipe}
 */
function moveBowerFiles() {
    var cssFilter = $.filter(["**/*.css","!**/*.min.css"], {
      restore: true
    }),
    jsFilter = $.filter("**/*.js"
    //, {       restore: true    }
    );

  return gulp.src(mainBowerFiles({
      includeDev: true
    }))
    .pipe($.plumber())
    // Get css
    .pipe(cssFilter)
    .pipe(gulp.dest("dev/content/styles"))
    .pipe(cssFilter.restore)
    // Get js
    .pipe(jsFilter)
    .pipe(gulp.dest("dev/lib")
    );
}

