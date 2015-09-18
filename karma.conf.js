// Karma configuration
// Generated on Tue Sep 15 2015 10:34:13 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'jasmine', 'es5-shim'],


    // list of files to exclude
    exclude: [
    ],


    babelPreprocessor: {
      options: {
        optional: ['es7.classProperties'],
        auxiliaryCommentBefore: "istanbul ignore next"
      }
    },


    // config for coverage reporter
    coverageReporter: {
      dir: process.cwd() + '/coverage',
      reporters: [
        { type : 'text-summary' },
        { type : 'html' }
      ],
      check: {
        global: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100
        }
      }
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

  })
}
