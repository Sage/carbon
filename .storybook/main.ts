import { StorybookConfig } from "@storybook/react-webpack5";

import path from "path";

import glob from "glob";

import remarkGfm from "remark-gfm";

const projectRoot = path.resolve(__dirname, "../");
const ignoreTests = process.env.IGNORE_TESTS === "true";
const enableReactStrictMode = process.env.ENABLE_REACT_STRICT_MODE === "true";
const isChromatic = !ignoreTests;
const getStories = () =>
  glob.sync(`${projectRoot}/src/**/*.{mdx,stories.@(js|jsx|ts|tsx)}`, {
    ...(ignoreTests && {
      ignore: `${projectRoot}/src/**/*-test.stories.@(js|jsx|ts|tsx)`,
    }),
  });

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-webpack5",
    options: { strictMode: enableReactStrictMode },
  },

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
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    "@storybook/addon-toolbars",
    "@storybook/addon-viewport",
    "@chromatic-com/storybook",
    "@storybook/addon-webpack5-compiler-babel",
  ],

  staticDirs: ["../.assets", "../logo"],

  webpackFinal: async (config) => ({
    ...config,
    module: {
      ...config?.module,
      rules: [
        ...(config?.module?.rules ?? []),
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|png)$/,
          type: "asset/resource",
          generator: {
            filename: "static/media/[name][ext]",
          },
        },
      ],
    },
  }),

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

  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
  },

  docs: {},
};

export default config;
