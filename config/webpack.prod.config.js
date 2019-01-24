// Utils
const merge = require('webpack-merge');

// Plugins
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

// Config
const baseConfig = require('./webpack.base.config');

const prodConfig = () => {
  return merge([
    {
      optimization: {
        minimizer: [
          new UglifyJsPlugin()
        ],
      },
      plugins: [
        new Visualizer({ filename: './statistics.html' })
      ],
    },
  ]);
};

module.exports = env => {
  return merge(baseConfig(env), prodConfig());
};
