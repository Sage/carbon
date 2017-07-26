var gulp = require('gulp');
var yargs = require('yargs');
var LintTask = require('carbon-factory/lib/gulp/lint').default;
var BuildTask = require('carbon-factory/lib/gulp/build').default;
var SpecTask = require('carbon-factory/lib/gulp/spec').default;
var generateColors = require('./script/generate-demo-colors').default;
var generateDocs = require('./script/generate-docs').default;
var deploy = require('./script/deploy').default;
var setConfig = require('./script/set-config').default;
var express = require('express');
var gutil = require('gulp-util');

var argv = yargs.argv;

var dir = 'deploy';

setConfig(argv.cdn);

gulp.task('prepare-demo', function() {
  generateColors();
  generateDocs();
});

gulp.task('webserver', function() {
  var app = express();
  // serve files from here
  app.use(express.static(dir));
  // always serve index.html
  app.get('/*', function(req, res){
    res.sendFile(__dirname + '/' + dir + '/index.html');
  });
  // set port
  var port = argv.port || 8095;
  gutil.log(gutil.colors.cyan('App running on port ') + gutil.colors.green(port));
  // run server
  app.listen(port);
});

gulp.task('build', BuildTask({
  src: './demo/main.js',
  jsDest: './' + dir + '/assets/javascripts',
  cssDest: './' + dir + '/assets/stylesheets',
  fontDest: './' + dir + '/assets/fonts',
  imageDest: './' + dir + '/assets/images'
}));

gulp.task('run-deploy', deploy);

gulp.task('default', ['prepare-demo', 'webserver', 'build']);
gulp.task('deploy', ['prepare-demo', 'build', 'run-deploy']);
gulp.task('lint', LintTask({
  errorThreshold: 11,
  warningThreshold: 2
}));

gulp.task('test', SpecTask({
  errorThreshold: 11,
  warningThreshold: 2,
  jestConfig: {
    preset: "./node_modules/carbon-factory/jest.conf.json",
    coverageThreshold: {
      global: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90
      }
    }
  }
}));
