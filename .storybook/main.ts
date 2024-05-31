import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

const projectRoot = path.resolve(__dirname, "../");

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: "automatic",
        },
      },
    },
  }),
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  staticDirs: ["../.assets", "../logo"], // Ensure this points to your static assets
  webpackFinal: async (config) => {
    if (!config.resolve) {
      config.resolve = {};
    }
    if (
      !config.resolve.alias ||
      typeof config.resolve.alias !== "object" ||
      Array.isArray(config.resolve.alias)
    ) {
      config.resolve.alias = {};
    }
    config.resolve.alias.helpers = path.resolve(__dirname, "__helpers__/");
    config.resolve.extensions = [".js", ".tsx", ".ts"];

    if (!config.module) {
      config.module = { rules: [] };
    }
    if (!config.module.rules) {
      config.module.rules = [];
    }

    // Type guard to check if rule is an object with a test property
    const isRuleWithTest = (rule: any): rule is { test: RegExp } =>
      typeof rule === "object" && rule !== null && "test" in rule;

    // Finds the rule for woff2 files and modifies the file-loader to preserve the original filenames to allow us to preload them
    const fontRuleIndex = config.module.rules.findIndex(
      (rule) => isRuleWithTest(rule) && rule.test.toString().includes("woff2")
    );
    if (fontRuleIndex !== -1) {
      config.module.rules[fontRuleIndex] = {
        test: /\.(woff(2)?|eot|ttf|otf|svg|png)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[name][ext]",
        },
      };
    } else {
      config.module.rules.push({
        test: /\.(woff(2)?|eot|ttf|otf|svg|png)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[name][ext]",
        },
      });
    }

    return config;
  },
};

export default config;
