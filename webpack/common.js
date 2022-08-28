const { merge } = require('webpack-merge');

const { sourcePath, buildPath } = require('./paths');
const html = require('./plugins/html');
const babel = require('./rules/babel');
const files = require('./rules/files');
const typescript = require('./rules/typescript');

const path = require('path');

module.exports = merge([
  {
    entry: {
      index: [
        'normalize.css',
        path.join(__dirname, './common.css'),
        `${sourcePath}/index.ts`,
      ],
    },
    output: {
      path: buildPath,
      filename: '[name].[fullhash].js',
      chunkFilename: '[name].[fullhash].js',
      assetModuleFilename: 'files/[hash][ext]',
    },
    resolve: {
      alias: {
        'src': sourcePath,
      },
      extensions: ['.ts', '.js'],
    },
    optimization: {
      splitChunks: {
        maxSize: 716800,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            name: 'vendor',
            enforce: true,
          },
        },
      },
    },
  },
  html,
  files,
  babel,
  typescript,
]);
