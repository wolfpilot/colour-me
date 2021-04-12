// Utils
const path = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin2');

module.exports = () => ({
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
    new Visualizer({ filename: './statistics.html' }),
  ],
});
