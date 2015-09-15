var gulp = require('gulp');
var Server = require('karma').Server;
var istanbul = require('browserify-istanbul');
var argv = require('yargs').argv;
var S = require('string');

gulp.task('test', function(done) {
  var path = 'src/**/*.js';
  var specs = 'spec/**/*.js';
  var preProcessors = ['babel', 'coverage', 'browserify'];
  var specPreProcessors = [ 'babel', 'browserify' ];

  var preProcessorObj = {};
  preProcessorObj[path] = preProcessors;
  preProcessorObj[specs] = specPreProcessors;

  var browsers = ['PhantomJS'];

  if (argv.b == 'all') {
    browsers = ['PhantomJS', 'Chrome', 'Firefox', 'Safari'];
  } else if (argv.b) {
    browsers = [S(argv.b).capitalize().s];
  }

  if (argv.build) {
    // single run mode
    var singleRun = true;
    var autoWatch = false;
    var reporters = ['progress', 'coverage'];
    var browserifyOpts = {
      debug: true,
      transform: [
        'babelify',
        istanbul({
          ignore: ['**/node_modules/**', '**/spec/**']
        })
      ]
    };
  } else {
    // watch mode
    var singleRun = false;
    var autoWatch = true;
    if (argv.coverage) {
      // coverage in watch mode
      var reporters = ['progress', 'coverage'];
      var browserifyOpts = {
        debug: true,
        transform: [
          'babelify',
          istanbul({
            ignore: ['**/node_modules/**', '**/spec/**']
          })
        ]
      };
    } else {
      // no coverage in watch mode
      var reporters = ['progress'];
      var browserifyOpts = {
        debug: true,
        transform: [
          'babelify'
        ]
      };
    }
  }

  var config = {
    configFile: __dirname + '/karma.conf.js',
    files: [path, specs],
    preprocessors: preProcessorObj,
    browsers: browsers,
    browserify: browserifyOpts,
    reporters: reporters,
    autoWatch: autoWatch,
    singleRun: singleRun
  };

  var server = new Server(config, done);
  server.start();
});
