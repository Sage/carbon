var gulp = require('gulp');
var SpecTask = require('carbon-factory/lib/gulp/spec').default;
const jestConfig = require('./jest.conf.json');

gulp.task('test', SpecTask({
  jestConfig,
  warningThreshold: 17
}));
