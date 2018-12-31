// =========================================================
// Gulp Task: vendors
// Description: move all node and bower dependencies to dist
// easily add sass, less, etc. Operate on each as needed.
// basic configuration supplied
// npm install --save-dev merge-stream gulp-newer
// gulp-load-plugins
// =========================================================
var config = require('../config.js'),
    merge = require('merge-stream'),
    mainBowerFiles = require("main-bower-files");

module.exports = function(gulp, $) {
    return function () {

        // ---------------------------------------------- Start Task
        // ---- move js files
        var cssFilter = $.filter(["**/*.css", "!**/*.min.css"]),
            jsFilter = $.filter("**/*.js");

        var js = 
        gulp.src(mainBowerFiles({includeDev: true}))
            .pipe($.sourcemaps.init({loadMaps: true}))
            .pipe(jsFilter)
            //.pipe($.if(config.optimized, $.concat(config.vendors.js.optimized)))
            //.pipe($.if(config.optimized, $.uglify()))
            //.pipe($.if(config.optimized, $.rev()))
            .pipe(gulp.dest(config.vendors.js.dest));

    // ---- move css files
        var css =
        gulp.src(mainBowerFiles({includeDev: true}))
            .pipe($.sourcemaps.init({loadMaps: true}))
            .pipe(cssFilter)
            .pipe($.if(config.optimized, $.concat(config.vendors.css.optimized)))
            .pipe($.if(config.optimized, $.minifyCss()))
            .pipe($.if(config.optimized, $.rev()))
            .pipe(gulp.dest(config.vendors.css.dest));

    // ---- move font files
        var fonts =
        gulp.src(config.vendors.fonts.src)
            .pipe($.newer(config.vendors.fonts.dest))
            .pipe(gulp.dest(config.vendors.fonts.dest));
            
    // ---- sass
        // var sass =
        // gulp.src(config.vendors.sass.src)
        //     .pipe(plugins.newer(config.vendors.sass.dest))
        //     .pipe(gulp.dest(config.vendors.sass.dest));


    // ------------------------------------------------ End Task
        var merged = merge(js, css, fonts); // add sass and/or less
        return merged;
    };
};