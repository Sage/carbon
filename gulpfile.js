var gulp = require('gulp');
var BuildTask = require('carbon-factory/lib/gulp/build').default;
var SpecTask = require('carbon-factory/lib/gulp/spec').default;
var express = require('express');
var api = require('./demo/api');

gulp.task('webserver', function() {
  var app = express();
  // serve files from here
  app.use(express.static('demo'));
  // define api endpoints
  app.get('/countries', function (req, res) {
    res.send(api.countries(req._parsedOriginalUrl.query));
  })
  // always serve index.html
  app.get('/*', function(req, res){
    res.sendFile(__dirname + '/demo/index.html');
  });
  // run server
  app.listen(8080);
});

gulp.task('build', BuildTask({
  src: './demo/main.js',
  jsDest: './demo/assets/javascripts',
  cssDest: './demo/assets/stylesheets',
  fontDest: './demo/assets/fonts'
}));

gulp.task('default', ['webserver', 'build']);

gulp.task('test', SpecTask());
