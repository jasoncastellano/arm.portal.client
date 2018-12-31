'use strict';

// =========================================================
// Gulp Task: clean
// Description: deletes dist folder
// npm install --save-del del gulp-load-plugins
// =========================================================
var del = require('del');

module.exports = function(gulp, $) {
    return function (cb) {
    var stream = 
// -------------------------------------------- Start Task
        del('./dist/', cb);
// ---------------------------------------------- End Task
    return stream;
    };
};

