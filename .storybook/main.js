const path = require("path");
const glob = require("glob");

const projectRoot = path.resolve(__dirname, "../");
const ignoreTests = process.env.IGNORE_TESTS === "true";
const isChromatic = !ignoreTests;
const getStories = () =>
  glob.sync(`${projectRoot}/src/**/*.stories.@(js|mdx|tsx)`, {
    ...(ignoreTests && {
      ignore: `${projectRoot}/src/**/*-test.stories.@(js|mdx|tsx)`,
    }),
  });

module.exports = {
  framework: "@storybook/react",
  stories: (list) => [
    ...list,
    "./welcome-page/welcome.stories.js",
    "../docs/*.stories.mdx",
    ...getStories(),
  ],
  core: {
    disableTelemetry: true,
  },
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "@storybook/addon-viewport",
    "@storybook/addon-a11y",
    "@storybook/addon-google-analytics",
    "@storybook/addon-links",
    "@storybook/addon-toolbars",
  ],
  staticDirs: ["../.assets", "../logo"],
  webpackFinal: async (config, { configType }) => {
    config.resolve = {
      alias: {
        helpers: path.resolve(__dirname, "__helpers__/"),
      },
      extensions: [".js", ".tsx", ".ts"],
    };

    // Workaround to stop hashes being added to font filenames, so we can pre-load them
    config.module.rules.find((rule) =>
      rule.test.toString().includes("woff2")
    ).options.name = "static/media/[name].[ext]";

    return config;
  },
  ...(isChromatic && {
    previewHead: (head) => `
      ${head}
      <meta name="robots" content="noindex">
  `,
    managerHead: (head) => `
      ${head}
      <meta name="robots" content="noindex">
  `,
  }),
};
