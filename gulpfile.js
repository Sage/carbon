var gulp = require('gulp');
var BuildTask = require('carbon-factory/lib/gulp/build');
var SpecTask = require('carbon-factory/lib/gulp/spec');
var connect = require('gulp-connect');

gulp.task('webserver', function() {
  connect.server({
    root: 'example'
  });
});

gulp.task('build', BuildTask({
  src: './example/main.js',
  jsDest: './example/assets/javascripts',
  cssDest: './example/assets/stylesheets',
  fontDest: './example/assets/fonts'
}));

gulp.task('default', ['webserver', 'build']);

gulp.task('test', SpecTask());
