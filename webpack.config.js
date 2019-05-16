const webpack = require('webpack');
const path = require('path');

const url = 'localhost:8095';
const prefix = process.env.ASSETS_PREFIX || `http://${url}`;
const config = require('carbon-factory/webpack.config')({
  entryPoint: './demo/main.js',
  outputPath: './deploy/assets',
  port: 8095,
  publicPath: `${prefix}/assets/`,
  serverBase: './deploy',
  singlePageApp: true
});

// we need this while we still support the demo site which loads in carbon-state-management
config.plugins.push(
  new webpack.NormalModuleReplacementPlugin(
    /carbon-react\/lib\/utils\/logger/,
    path.resolve('./src/utils/logger/logger.js')
  )
);

module.exports = config;
