const path = require("path");
const glob = require("glob");
const projectRoot = path.resolve(__dirname, "../");
const ignoreTests = process.env.IGNORE_TESTS === "true";
const isChromatic = !ignoreTests;
const getStories = () =>
  glob.sync(`${projectRoot}/src/**/*.{mdx,stories.@(js|jsx|ts|tsx)}`, {
    ...(ignoreTests && {
      ignore: `${projectRoot}/src/**/*-test.stories.@(js|jsx|ts|tsx)`,
    }),
  });
module.exports = {
  stories: [
    "./welcome-page/welcome.stories.js",
    "../docs/*.mdx",
    "../docs/*.stories.tsx",
    ...getStories(),
  ],
  core: {
    disableTelemetry: true,
  },
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-controls",
    "@storybook/addon-docs",
    "@storybook/addon-links",
    "@storybook/addon-mdx-gfm",
    "@storybook/addon-toolbars",
    "@storybook/addon-viewport",
  ],
  staticDirs: ["../.assets", "../logo"],
  webpackFinal: async (config, { configType }) => {
    config.resolve = {
      alias: {
        helpers: path.resolve(__dirname, "__helpers__/"),
      },
      extensions: [".js", ".tsx", ".ts"],
    };

    // Finds the rule for woff2 files and modifies the file-loader to preserve the original filenames to allow us to preload them
    const fontRuleIndex = config.module.rules.findIndex((rule) =>
      rule.test.toString().includes("woff2")
    );
    if (fontRuleIndex !== -1) {
      config.module.rules[fontRuleIndex] = {
        test: /\.(woff(2)?|eot|ttf|otf|svg|png)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[name][ext]",
        },
      };
    }

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
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
