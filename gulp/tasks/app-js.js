// =========================================================
// Gulp Task: app-js
// Description: babelfies, sorts, concats, and annotates app scripts
// npm install --save-dev gulp-babel gulp-angular-filesort gulp-replace gulp-headerfooter gulp-ng-annotate gulp-load-plugins
// =========================================================

var config = require("../config");

module.exports = function(gulp, $) {
  return function () {
    var stream = gulp
      .src(config.appjs.src)
      .pipe($.plumber())
      .pipe($.preprocess({context: {IMAGESRC: config.images.absolutePath}}))
      .pipe($.sourcemaps.init())
      .pipe($.babel())
      .pipe($.angularFilesort())
      .pipe($.replace(/'use strict';/g, ""))
      .pipe($.concat(config.appjs.optimized))
      .pipe($.headerfooter("(function(window, undefined) {'use strict';\n", "})(window);"))
      .pipe($.ngAnnotate())
      .pipe($.sourcemaps.write("."))
      .pipe(gulp.dest(config.appjs.dest));
    
    return stream;
  };    
}