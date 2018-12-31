'use strict';

var gulp = require('gulp');
var helper = require('../helpers');
var rm = require('del').sync;
var config = require("../../gulp.config")();
var wiredep = require("wiredep").stream;
var args = helper.args;

var $ = helper.plugins;

module.exports = buildHtml;

function buildHtml(dest) {
    rm(dest + "**/*.html");

    return gulp
      .src(config.src.globs.htmltemplates)
      .pipe($.plumber())
      .pipe($.if(args.verbose, $.bytediff.start()))
      .pipe($.minifyHtml({
        empty: true
      }))
      .pipe($.if(args.verbose, $.bytediff.stop(bytediffFormatter)))
      .pipe($.angularTemplatecache(
        config.templateCache.file,
        config.templateCache.options
      ))
      .pipe(gulp.dest(dest));
}