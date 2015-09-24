var gulp = require('gulp');
var paths = require('../paths');
var del = require('del');
var vinylPaths = require('vinyl-paths');


gulp.task('copy', function() {
  del([paths.pluginPath], {
    force: true
  }, function (err, deletedFiles) {
    gulp.src(['dist/system/**/*']).pipe(gulp.dest(paths.pluginPath));
  });
});
