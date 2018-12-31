'use strict';

var gulp = require('gulp');
var config = require("../../gulp.config")();

module.exports = copyImages;

/**
 * Copies images to dev dest
 *
 * @returns {Pipe}
 */
function copyImages() {
    return gulp.src("content/images/**/*.*")
    .pipe(gulp.dest(config.dev.images));
}

