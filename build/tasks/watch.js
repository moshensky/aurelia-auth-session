var gulp = require('gulp');
var paths = require('../paths');
var browserSync = require('browser-sync');
var jade = require('gulp-jade');
var less = require('gulp-less');
var path = require('path');
var moment = require('moment');
var colors = require('colors');
var del = require('del');
var runSequence = require('run-sequence');

// outputs changes to files to the console
function reportChange(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

var logWatchEventInfo = function (title, event) {
  var currentTime = moment(Date.now()).format('DD.MM.YY �. HH:mm');
  console.log('===============================================');
  console.log(currentTime.toString().bold.green + ' ' + title.bold + ': ');
  console.log('    type: '.bold + event.type);
  console.log('    path: '.bold + event.path);
};


function compileJade(event) {
  logWatchEventInfo('Jade compile', event);
  var destPath = path.relative(paths.root, event.path);
  console.log(destPath);
  destPath = path.dirname(destPath);
  console.log(event.path);
  console.log(destPath);
  gulp.src(event.path)
    .pipe(jade({
      pretty: true
    }))
    //.pipe(gulp.dest(destPath));
    .pipe(gulp.dest('./src/' + destPath));
}

function compileLess(event) {
  logWatchEventInfo('Less compile', event);
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest('src/.'));
}

gulp.task('watch', ['compile-jade', 'compile-less'], function () {
  gulp.watch(paths.source, ['build-js-system-copy', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.html, ['build-html-system-copy', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.css, ['build-css-system-copy', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.style, browserSync.reload).on('change', reportChange);
  gulp.watch(paths.jade, compileJade);
  gulp.watch(paths.less, compileLess);
});

gulp.task('build-js-system-copy', function (callback) {
  return runSequence(
    'build-js-system',
    'copy',
    callback
  );
});

gulp.task('build-html-system-copy', function (callback) {
  return runSequence(
    'build-html-system',
    'copy',
    callback
  );
});

gulp.task('build-css-system-copy', function (callback) {
  return runSequence(
    'build-css-system',
    'copy',
    callback
  );
});

