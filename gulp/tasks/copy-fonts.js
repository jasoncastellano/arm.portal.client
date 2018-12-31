'use strict';

var config = require('../config.js'),
    helper = require('../helpers'),
    rm = require('del').sync,
    args = helper.args;

/**
 * Copies fonts to dev dest
 *
 * @returns {Pipe}
 */
module.exports = function(gulp, $) {
    return function () {
    var stream = 
        gulp.src(config.vendors.fonts.src)
            .pipe(gulp.dest($.if(args.dist, config.vendors.fonts.dest, config.vendors.fonts.devDest)));
    return stream;
    };
};

