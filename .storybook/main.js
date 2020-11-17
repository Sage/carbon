const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.(js|mdx)', './welcome-page/welcome.stories.js', '../docs/*.stories.mdx'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-notes/register',
    '@storybook/addon-viewport/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs',
    '@storybook/addon-google-analytics/register',
    '@storybook/addon-links',
    './.storybook/theme-selector/register',
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push(
      {
        test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']
      }
    );

    config.resolve = {
      alias: {
        helpers: path.resolve(__dirname, '__helpers__/'),
      },
      extensions: ['.js']
    };

    if(process.env.ENABLE_PROFILER){
      config.resolve.alias['react-dom$'] = 'react-dom/profiling';
      config.resolve.alias['scheduler/tracing'] = 'scheduler/tracing-profiling';
    };

    return config;
  },
};