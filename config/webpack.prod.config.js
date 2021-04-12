// Utils
const { merge } = require('webpack-merge');

// Plugins
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Config
const baseConfig = require('./webpack.base.config');

const prodConfig = () => {
  return merge([
    {
      mode: 'production',
      optimization: {
        minimizer: [
          new UglifyJsPlugin()
        ],
      },
    },
  ]);
};

module.exports = env => {
  return merge(baseConfig(env), prodConfig());
};
