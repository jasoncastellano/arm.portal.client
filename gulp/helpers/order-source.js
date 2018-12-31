'use strict';

var $ = require('./plugins');
var gulp = require('gulp');


module.exports = orderSource;



/**
 * Order a stream
 * @param   {Stream} src   The gulp.src stream
 * @param   {Array} order Glob array pattern
 * @returns {Stream} The ordered stream
 */
function orderSource(src, order, options) {
  //order = order || ['**/*'];
  return gulp
    .src(src, options)
    .pipe($.if(order, $.order(order)));
}