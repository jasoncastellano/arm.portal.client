'use strict';

var gulp = require('gulp');
var helper = require('../helpers');
var wiredep = require('wiredep').stream;
var pipe = require('../pipes');

var $ = helper.plugins;

module.exports = compileIndex;

/**
 * Builds the development version of `index.html`.
 */
function compileIndex() {
    var options = {
        devDependencies: true,
        exclude: ["datatables.bootstrap.min.css"],
        ignorePath: "../..",
        fileTypes: {
            html: {
                replace: {
                    js: function (filePath) {
                        var path = '<script src="'
                            //+ (addRootSlash ? '/' : '')
                            +
                            'lib/' +
                            filePath
                            .replace(/^.*[\\/]/, '') +
                            '"></script>';
                        return path;
                    },
                    css: function (filePath) {
                        return '<link rel="stylesheet" href="'
                            //+ (addRootSlash ? '/' : '')
                            +
                            'content/styles/' +
                            filePath
                            .replace(/^.*[\\/]/, '') +
                            '" />';
                    }

                }
            }
        }
    };


    return gulp.src('index.html')
        .pipe($.duration('Build index.html'))
        .pipe(helper.printable())
        .pipe(wiredep(options))
        .pipe($.inject(pipe.build.app("dev"), {
            ignorePath: "dev",
            addRootSlash: false
        }))
        .pipe(gulp.dest('dev'));
}