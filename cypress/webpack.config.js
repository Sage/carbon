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
        use: [
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
        ],
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
};
