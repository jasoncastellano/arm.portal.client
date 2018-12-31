'use strict';

var config = require('../config.js'),
    helper = require('../helpers'),
    merge = require('merge-stream'),
    args = helper.args;

/**
 * Copies assets to dist
 *
 * @returns {Pipe}
 */
module.exports = function(gulp, $) {
    return function () {
    var imageStream = 
        gulp.src(config.images.src)
            .pipe(gulp.dest(config.images.dest));
    
    var miscStream =
        gulp.src(["./favicon.ico", "./Web.config"])
            .pipe(gulp.dest("./dist/"));
    
    var fontStream = gulp.src(config.vendors.fonts.src)
            .pipe(gulp.dest($.if(args.dist, config.vendors.fonts.dest, config.vendors.fonts.devDest)));
        
    return merge(imageStream,miscStream,fontStream);
    };
};

