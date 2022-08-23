const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { buildPath } = require('../paths');

module.exports = {
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: buildPath,
    }),
  ],
};
