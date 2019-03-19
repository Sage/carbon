const path = require('path');

module.exports = ({ config, mode }) => {
  config.module.rules.push(
    {
      test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']
    }
  );

  config.resolve = {
    alias: {
      helpers: path.resolve(__dirname, '__helpers__/')
    },
    extensions: ['.js']
  };

  return config;
};