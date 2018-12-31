// =========================================================
// Gulp Task: sass
// Description: transpiles sass, adds sourcemaps, prefixes
// npm install --save-dev node-sass gulp-sass gulp-sourcemaps gulp-autoprefixer gulp-load-plugins
// =========================================================

var rm = require('del').sync,
    config = require("../config"),
    wiredep = require("wiredep").stream;


module.exports = function(gulp, $) {
  return function () {
    var stream = 
    // -------------------------------------------- Start Task
    gulp.src(config.sass.src.wiredep)
    .pipe($.preprocess({context: {IMAGEPATH: config.images.relativePath, FONTPATH: config.vendors.fonts.relativePath}}))
    .pipe($.sourcemaps.init())
    .pipe($.plumber()) // exit gracefully if something fails after this
    .pipe(wiredep())
    .pipe($.sassGlob())
    .pipe($.sass().on("error", $.sass.logError))
    .pipe($.autoprefixer(config.autoprefixer.opts))
    .pipe($.sourcemaps.write("."))
    .pipe($.flatten())
    .pipe(gulp.dest(config.sass.dest))
    .pipe($.filter(['**/*.css']))
    .pipe(config.browsersync.instance.stream());

    return stream;
  };
};