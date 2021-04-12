// Utils
const { merge } = require('webpack-merge');

// Config
const baseConfig = require('./webpack.base.config');

// @NOTE: Dev only!
require('@babel/register');

const config = () => ({
  mode: 'development',
  devtool: 'source-map',
});

module.exports = env => merge(baseConfig(env), config());
