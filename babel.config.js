const inProduction = process.env.NODE_ENV === "production";
const inStorybookBuild = process.env.STORYBOOK_BUILD === "true";

module.exports = (api) => {
  const useCJSModules = api.env(["test", "cjs"]);

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "usage",
          targets: {
            browsers:
              "last 2 Chrome versions, last 2 Firefox versions, last 2 Edge versions, last 2 Safari versions",
          },
          corejs: "3.20",
          modules: useCJSModules ? "auto" : false,
        },
      ],
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    plugins: [
      !inStorybookBuild &&
        inProduction &&
        "./plugins/generate-proptypes/index.mjs",
      "babel-plugin-dev-expression",
    ].filter(Boolean),
  };
};
