// Utils
const { merge } = require('webpack-merge');

// Config
const baseConfig = require('./webpack.base.config');

// @NOTE: Dev only!
require('@babel/register');

const devConfig = () => {
  return merge([
    {
      mode: 'development',
      devtool: 'source-map',
    },
  ]);
};

module.exports = env => {
  return merge(baseConfig(env), devConfig());
};
