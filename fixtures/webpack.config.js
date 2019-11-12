const path = require('path');
const config = require('carbon-factory/webpack.config')({
  entryPoint: './fixtures/src/main.js',
  singlePageApp: true,
  port: 9901,
  serverBase: 'fixtures'
});

config.resolve.alias = {
  'carbon-react/lib': path.resolve('./src')
};

module.exports = config;
