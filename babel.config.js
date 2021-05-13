module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        targets: {
          browsers:
            "last 2 Chrome versions, last 2 Firefox versions, last 2 Edge versions, last 2 Safari versions",
        },
        corejs: "3.1",
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-classes",
  ],
};
