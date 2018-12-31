// =========================================================
// Gulp Task: 
// Description: 
// Dependencies: npm install 
// =========================================================
var 
    config = require('../config.js'),
    helper = require('../helpers'),
    args = helper.args,
    del = require('del'),
    rm = del.sync;

module.exports = function(gulp, $) {
    return function () {
    var deployConfig;
    switch(args.env){
        case 'qa': {
            deployConfig = config.deploy.qa;
            break;
        }
        case 'prod': {
            deployConfig = config.deploy.prod;
            break;
        }
        case 'dev':
        default: {
            deployConfig = config.deploy.dev;
            break;
        }
    }

    if(deployConfig.clean) {
        
        rm(['/**/*', '!**/api','!**/api/*'], {
            root: deployConfig.cleanRoot,
            force: true});
    }

    var stream = 
// -------------------------------------------- Start Task
    gulp.src("./dist/**/*")
        .pipe(gulp.dest(deployConfig.path));
// ---------------------------------------------- End Task
    return stream;
    };
};