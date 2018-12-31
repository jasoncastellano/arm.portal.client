// =========================================================
// Gulp Task: 
// Description: 
// Dependencies: npm install 
// =========================================================
var config = require('../config.js'),
    helper = require('../helpers'),
    wiredepOptions = helper.wiredepOptions,
    wiredep = require("wiredep").stream;

module.exports = function(gulp, $) {
    return function () {
    var options = wiredepOptions(),
        wiredepConfig = config.wiredep(),
        stream = 
// -------------------------------------------- Start Task
    gulp.src(config.index)
    .pipe(wiredep(options))
    .pipe(gulp.dest(wiredepConfig.dest));
// ---------------------------------------------- End Task
    return stream;
    };
};