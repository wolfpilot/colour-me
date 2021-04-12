// Utils
const { merge } = require('webpack-merge');

// Plugins
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Config
const baseConfig = require('./webpack.base.config');

const config = () => ({
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ],
  },
});

module.exports = env => merge(baseConfig(env), config());
