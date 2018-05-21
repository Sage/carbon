module.exports = require('carbon-factory/webpack.config')({
  entryPoint: '/demo/main.js',
  outputPath: '/deploy/assets',
  port: 8095,
  serverBase: '/deploy',
  parcelifyPaths: [`${process.cwd()}/demo`],
  singlePageApp: true
});
