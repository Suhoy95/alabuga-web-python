const path = require("path")

const webpack = require("webpack");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: [ "./src/index.jsx"],
  output: {
    path: path.join(path.resolve(__dirname), "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/react",
          ],
        }
      }
    }, {
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    }]
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },

  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({}),
    new ESLintPlugin({
      context: ".",
      extensions: ["js", "jsx"],
      files: "src/"
    })
  ],
};
