var gulp = require('gulp');
var BuildTask = require('carbon-factory/lib/gulp/build');
var SpecTask = require('carbon-factory/lib/gulp/spec');
var express = require('express');
var api = require('./example/api');

gulp.task('webserver', function() {
  var app = express();
  // serve files from here
  app.use(express.static('example'));
  // define api endpoints
  app.get('/countries', function (req, res) {
    res.send(api.countries(req._parsedOriginalUrl.query));
  })
  // run server
  app.listen(8080);
});

gulp.task('build', BuildTask({
  src: './example/main.js',
  jsDest: './example/assets/javascripts',
  cssDest: './example/assets/stylesheets',
  fontDest: './example/assets/fonts'
}));

gulp.task('default', ['webserver', 'build']);

gulp.task('test', SpecTask());
