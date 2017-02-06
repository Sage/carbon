var gulp = require('gulp');
var yargs = require('yargs');
var BuildTask = require('carbon-factory/lib/gulp/build').default;
var SpecTask = require('carbon-factory/lib/gulp/spec').default;
var generateColors = require('./script/generate-demo-colors').default;
var express = require('express');
var api = require('./demo/api');
var gutil = require('gulp-util');

var argv = yargs.argv;

var dir = argv.dir || 'demo';

gulp.task('prepare-demo', function() {
  generateColors();
});

gulp.task('webserver', function() {
  var app = express();
  // serve files from here
  app.use(express.static(dir));
  // define api endpoints
  app.get('/countries', function (req, res) {
    res.send(api.countries(req._parsedOriginalUrl.query));
  })
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
  src: './' + dir + '/main.js',
  jsDest: './' + dir + '/assets/javascripts',
  cssDest: './' + dir + '/assets/stylesheets',
  fontDest: './' + dir + '/assets/fonts',
  imageDest: './' + dir + '/assets/images'
}));

gulp.task('default', ['prepare-demo', 'webserver', 'build']);

gulp.task('test', SpecTask());
