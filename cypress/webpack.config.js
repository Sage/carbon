const webpack = require("webpack");

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|woff2)$/,
        loader: "url-loader",
        options: {
          limit: 1032000,
          mimetype: "application/font-woff",
        },
      },
      {
        test: /\.(ttf|otf|eot|svg|png)(\?[\s\S]+)?$/,
        loader: "file-loader",
        options: {
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        IGNORE_TESTS: JSON.stringify(process.env.IGNORE_TESTS),
      },
    }),
  ],
};
