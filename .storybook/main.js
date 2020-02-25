const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.(js|mdx)', './welcome-page/welcome.stories.js'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-notes/register',
    '@storybook/addon-viewport/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs',
    '@storybook/addon-google-analytics/register',
    path.resolve(__dirname, 'theme-selector/register'),
  ],
  webpackFinal: async (config, { configType }) => {
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
  },
};