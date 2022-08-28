const StyleLintPlugin = require('stylelint-webpack-plugin');
const path = require('path');

const { rootPath } = require('../paths');

module.exports = {
  plugins: [
    new StyleLintPlugin({
      configFile: path.resolve(rootPath, '.stylelintrc.json'),
      files: './src/**/*.pcss',
      quiet: false,
    }),
  ],
};
