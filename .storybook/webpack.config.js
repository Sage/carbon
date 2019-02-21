const path = require('path');

module.exports = (storybookBaseConfig, configType, defaultConfig) => {
  defaultConfig.module.rules.push(
    {
      test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']
    }
  );

  defaultConfig.resolve = {
    alias: {
      helpers: path.resolve(__dirname, '__helpers__/')
    },
    extensions: ['.js']
  };

  return defaultConfig;
};