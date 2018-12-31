// =========================================================
// Gulp Task: 
// Description: 
// Dependencies: npm install 
// =========================================================
var config = require('../config.js'),
    helper = require('../helpers'),
    inject = helper.injector,
    args = helper.args;

module.exports = function(gulp, $) {
    return function () {
    var stream = 
// -------------------------------------------- Start Task
    gulp.src(config.index)
        .pipe($.plumber())
        .pipe(inject('./src/assets/styles/css/app.css', "", config.useIisExpress)) // Inject CSS
        .pipe($.inject(gulp.src("./favicon.ico"), {
            transform: function (filepath) {
                var output = (filepath.slice(-4) === ".ico") 
                    ? '<link href="' + 
                    (config.useIisExpress ? "/" : "") + 
                    filepath.replace(config.wiredep().filepathRegex, "") + 
                    '" rel="shortcut icon" type="image/x-icon">' 
                    : $.inject.transform.apply($.inject.transform, arguments);
                    
                    return output;
                }
            }))
        // Inject app scripts
        .pipe(inject(config.scripts.src, "", config.useIisExpress))
        // Inject templates
        .pipe(inject(config.templatecache.dest + "/templates.js", "templates", config.useIisExpress))
        .pipe(gulp.dest(config.destRoot));
// ---------------------------------------------- End Task
    return stream;
    };
};