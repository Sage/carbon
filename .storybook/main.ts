import { StorybookConfig } from "@storybook/react-vite";

import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

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
      ignore: `${projectRoot}/src/**/*-@(interaction|test).stories.@(js|jsx|ts|tsx)`,
    }),
  });

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: { strictMode: enableReactStrictMode },
  },

  stories: [
    "./welcome-page/welcome.stories.jsx",
    "../docs/*.mdx",
    "../docs/*.stories.tsx",
    ...getStories(),
  ],

  core: {
    disableTelemetry: true,
    builder: "@storybook/builder-vite",
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
    "@storybook/addon-interactions",
    "storybook-addon-pseudo-states",
    "@storybook/addon-essentials",
    "@storybook/addon-toolbars",
    "@storybook/addon-viewport",
    "@chromatic-com/storybook",
  ],

  staticDirs: ["../.assets", "../logo"],

  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      plugins: [
        react(),
        viteStaticCopy({
          targets: [
            {
              src: path.resolve(
                __dirname,
                "../node_modules/@sage/design-tokens/assets/fonts/*",
              ),
              dest: "static/media",
            },
            {
              src: path.resolve(__dirname, "../src/style/assets/*"),
              dest: "static/media",
            },
          ],
        }),
      ],
      resolve: {
        alias: {
          // Required to load font assets correctly from @sage/design-tokens package
          "~@sage": path.resolve(__dirname, "../node_modules/@sage/"),
        },
      },
      build: {
        rollupOptions: {
          output: {
            assetFileNames: "static/media/[name][extname]",
          },
        },
      },
    });
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

  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
  },

  docs: {},
};

export default config;
