// =========================================================
// Project: PROJECT-NAME
// NOTE: Using Gulp 4
// npm install --save-dev gulp-load-plugins gulpjs/gulp.git#4.0
// =========================================================
var gulp = require('gulp'),
	config = require('./gulp/config'),
	$ = require('gulp-load-plugins')();

// ---------------------------------- Gulp Terminal Commands
// ---- gulp
// ---- gulp build
// ---- gulp new-task

// --------------------function to get tasks from gulp/tasks
function getTask(task) {
    return require('./gulp/tasks/' + task)(gulp, $);
}

// ---------------------------------------------- Gulp Tasks
gulp.task('sass', getTask('sass'));
gulp.task('app-js', getTask('app-js'));
gulp.task('templatecache', getTask('templatecache'));
gulp.task('inject-vendors', getTask('inject-vendors'));
gulp.task('inject-assets', getTask('inject-assets'));
gulp.task('copy-assets', getTask('copy-assets'));
gulp.task('set-basepath', getTask('set-basepath'));
gulp.task('new-task', getTask('new-task'));
gulp.task('sync', getTask('browsersync'));
gulp.task('clean', getTask('clean'));
gulp.task('deploy', getTask('deploy'));
gulp.task('vendors', getTask('vendors'));
gulp.task('optimize', getTask('optimize'));


// --------------------------------------- Default Gulp Task
 gulp.task('default', gulp.series(
        gulp.parallel(
            'sass', 
            'app-js', 
            'templatecache'),
         'set-basepath',
         'inject-vendors',
         'inject-assets')
 );

 gulp.task('build-dist', gulp.series(
     'clean',
     'default',
     'copy-assets',
     'optimize')
 );

 gulp.task('deploy-build', gulp.series(
     'build-dist',
     'deploy'
 ));

 gulp.task('watch', gulp.series('default','sync'));

// ---------------------------------------------- gulp build
// vendors - task which moves and operates on node_modules
// and bower_components dependencies
// moveDist: moves dist folder to another location
// on the file system (useful for multiple repos e.g. gh-pages)
// gulp.task('build', gulp.series('clean',
//     gulp.parallel('scripts', 'styles', 'html'), 'vendors', 'moveDist')
// );


// =========================================================
// Basic example of gulp multifile tasks folder structure
// =========================================================
// **** Project-Directory/
// ------ gulpfile.js
// ****** src/
// ****** dist/
// ****** gulp/
// -------- config.js
// ******** tasks/
// ******** utils/
// ----------- newTaskTemplate.js