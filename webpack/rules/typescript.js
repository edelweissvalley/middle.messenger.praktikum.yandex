module.exports = {
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          reportFiles: ['src/**/*.{ts,js}'],
        },
      },
    ],
  },
};
