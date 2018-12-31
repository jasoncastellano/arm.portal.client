'use strict';

var gulp = require('gulp');
var rm = require('del').sync;
var config = require("../../gulp.config")();


module.exports = copyTemplates;

/**
 * Copies fonts to dev dest
 *
 * @returns {Pipe}
 */
function copyTemplates() {
    rm(config.dev.app + "**/*.html");

    return gulp.src(config.src.globs.htmltemplates)
    .pipe(gulp.dest(config.dev.app));
}

