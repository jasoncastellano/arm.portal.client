// =========================================================
// Gulp Task: 
// Description: 
// Dependencies: npm install 
// =========================================================
var config = require('../config.js'),
    helper = require('../helpers'),
    log = helper.logger;

module.exports = function(gulp, $) {
    return function () {
        log("Set site basepath based on iis option value");
        var sourcePath = config.useIisExpress ? '/' : '/arm/',
            stream = 
// -------------------------------------------- Start Task
        gulp.src([config.index, config.root + 'Web.config'])
            .pipe($.replace(/<base href=".*"\s*\/>/gi, '<base href="' + sourcePath + '" />'))
            .pipe($.replace(/<action type="Rewrite" url=".*"\s* \/>/gi, '<action type="Rewrite" url="' + sourcePath + '" />'))
            .pipe(gulp.dest(config.root));
    // ---------------------------------------------- End Task
        return stream;
    };
};