// =========================================================
// Gulp Task: browsersync
// NOTE: Using gulp v4
// Description:  Sync sass, html, and browser
// using external config or add modify src
// npm install --save-dev browser-sync gulp-typescript gulpjs/gulp.git#4.0 gulp-load-plugins
// Options: node-sass gulp-sass || gulp-ruby-sass
// =========================================================
var config = require('../config.js'),
    browserSync = config.browsersync.instance;

module.exports = function(gulp, $) {
    return function () {
    var stream = 
// -------------------------------------------- Start Task
    browserSync.init(config.browsersync.opts);

    gulp.watch(config.sass.src.all, gulp.series('sass'));
    gulp.watch(config.appjs.src, gulp.series('app-js'));
    gulp.watch(config.templatecache.src, gulp.series('templatecache'));
    //browserSync.watch(config.templatecache.src, gulp.series('templatecache'));
    gulp.watch(config.browsersync.watch).on('change', browserSync.reload);
// ---------------------------------------------- End Task
    return stream;
    };
};