// =========================================================
// Gulp Task: 
// Description: 
// Dependencies: npm install 
// =========================================================
var config = require('../config.js'),
    helper = require('../helpers'),
    mainBowerFiles = require("main-bower-files"),
    args = helper.args,
    merge = require('merge-stream');

module.exports = function(gulp, $) {
      // Filters are named for the gulp-useref path
var 
  jsAppFilter = $.filter("**/" + config.appjs.optimized, {
    restore: true
  }),
  jslibFilter = $.filter("**/" + config.vendors.js.optimized, {restore: true}),

  cssFilter = $.filter(["**/*.css", "!**/*.min.css", "!**/*css.map"], {restore: true}),
  
  indexHtmlFilter = $.filter(['**/*', '!**/index.html'], { restore: true }),
  revFilter = $.filter(["**/*.css", "!**/*.min.css", "!**/*css.map", "**/" + config.appjs.optimized, "**/" + config.vendors.js.optimized], {restore: true});

    return function () {
        var stream = 
            gulp.src(config.index)
                .pipe($.plumber())
                .pipe($.useref())
                .pipe($.sourcemaps.init({loadMaps: true}))
                .pipe(cssFilter)
                .pipe($.minifyCss())
                .pipe(cssFilter.restore)
                .pipe(jsAppFilter)
                .pipe($.uglify())
                .pipe(jsAppFilter.restore)
                .pipe(jslibFilter)
                .pipe($.uglify())
                .pipe(jslibFilter.restore)
                .pipe(indexHtmlFilter)        
                // Take inventory of the file names for future rev numbers
                .pipe($.rev())
                // Replace the file names in the html with rev numbers
                .pipe(indexHtmlFilter.restore)
                .pipe($.revReplace())
                .pipe($.sourcemaps.write("."))
                .pipe($.filter(["**/*", "!**/index.html.map"]))
                .pipe(gulp.dest(config.destRoot));
    return stream;
    };
};