// process.traceDeprecation = true;
// node --trace-deprecation node_modules/webpack/bin/webpack.js
const { merge } = require('webpack-merge');

const postCss = require('./webpack/rules/postcss');
const extractCSS = require('./webpack/rules/css.extract');
const miniCssExtract = require('./webpack/plugins/miniCssExtract');
const clean = require('./webpack/plugins/clean');
const styleLint = require('./webpack/plugins/styleLint');
const terser = require('./webpack/plugins/terser');
const common = require('./webpack/common');

const dev = [
  {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      port: 3000,
      hot: true,
      historyApiFallback: true,
      static: {
        publicPath: '/',
      },
    },
    stats: 'errors-warnings',
  },
  postCss,
  styleLint,
];

const prod = [
  { mode: 'production' },
  extractCSS,
  miniCssExtract,
  clean,
  terser,
];

module.exports = (e) => (merge([common, ...(e && e.WEBPACK_SERVE ? dev : prod)]));
