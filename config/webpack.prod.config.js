// Utils
const { merge } = require('webpack-merge');

// Plugins
const TerserPlugin = require("terser-webpack-plugin");

// Config
const baseConfig = require('./webpack.base.config');

const config = () => ({
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
});

module.exports = env => merge(baseConfig(env), config());
