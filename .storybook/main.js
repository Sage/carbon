const path = require("path");

module.exports = {
  stories: [
    "./welcome-page/welcome.stories.js",
    "../docs/*.stories.mdx",
    "../src/**/*.stories.@(js|mdx)",
  ],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-knobs",
    "@storybook/addon-viewport",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-google-analytics",
    "@storybook/addon-links",
    "./theme-selector/register",
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve = {
      alias: {
        helpers: path.resolve(__dirname, "__helpers__/"),
      },
      extensions: [".js"],
    };

    // Workaround to stop hashes being added to font filenames, so we can pre-load them
    config.module.rules.find((rule) =>
      rule.test.toString().includes("woff2")
    ).options.name = "static/media/[name].[ext]";

    return config;
  },
};
