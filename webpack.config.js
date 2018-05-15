module.exports = require('carbon-factory/webpack.config')({
  entryPoint: '/demo/main.js',
  outputPath: '/deploy/assets',
  serverBase: '/deploy',
  parcelifyPaths: [`${process.cwd()}/demo`],
  singlePageApp: true
});
