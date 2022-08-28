module.exports = {
  module: {
    rules: [
      {
        test: /\.(pcss|css$)/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
};
