const path = require('path');
module.exports = require('carbon-factory/webpack.config')({
  entryPoint: './demo/main.js',
  outputPath: './deploy/assets',
  port: 8095,
  serverBase: './deploy',
  parcelifyPaths: [path.resolve(process.cwd(), './demo')],
  singlePageApp: true
});