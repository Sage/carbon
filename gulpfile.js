var gulp = require('gulp');
var BuildTask = require('carbon-factory/lib/gulp/build');
var SpecTask = require('carbon-factory/lib/gulp/spec');

gulp.task('default', BuildTask({
  src: './example/main.js',
  jsDest: './example/assets/javascripts',
  cssDest: './example/assets/stylesheets',
  fontDest: './example/assets/fonts'
}));

gulp.task('test', SpecTask({
  coverage: {
   statements: 90.53,
   branches: 83.72,
   functions: 84.25,
   lines: 83.02
  }
}));
