// Utils
const path = require('path');
const merge = require("webpack-merge");
const webpack = require('webpack');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  const { PLATFORM } = env;

  return merge([
    {
      entry: [
        path.resolve(__dirname, '../src/index.js'),
        path.resolve(__dirname, '../src/index.css'),
      ],
      output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'bundle.js',
      },
      module: {
        rules: [
          // JS Files
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
          },
          // CSS Files
          {
            test: /\.css$/,
            use: [
              {
                loader: "style-loader"
              },
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: "[name]_[local]_[hash:base64]",
                  sourceMap: true
                }
              }
            ]
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: './index.html'
        }),
        new webpack.DefinePlugin({
          'process.env.PLATFORM': JSON.stringify(PLATFORM)
        }),
      ],
    }
  ])
};
