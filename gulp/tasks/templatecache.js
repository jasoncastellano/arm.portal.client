// =========================================================
// Gulp Task: 
// Description: 
// Dependencies: npm install --save-dev gulp-plumber gulp-bytediff gulp-minifyHtml gulp-angular-templatecache gulp-plugins
// =========================================================
var config = require('../config.js'),
    helper = require('../helpers')
    args = helper.args,
    byteDiffFormatter = helper.byteDiffFormatter;

module.exports = function(gulp, $) {
    return function () {
    var stream = 
// -------------------------------------------- Start Task
     gulp.src(config.templatecache.src)
      .pipe($.plumber())
      .pipe($.if(args.verbose, $.bytediff.start()))
      .pipe($.minifyHtml({
        empty: true
      }))
      .pipe($.if(args.verbose, $.bytediff.stop(byteDiffFormatter)))
      .pipe($.angularTemplatecache(
        config.templatecache.file,
        config.templatecache.options
      ))
      .pipe(gulp.dest(config.templatecache.dest));
// ---------------------------------------------- End Task
    return stream;
    };
};