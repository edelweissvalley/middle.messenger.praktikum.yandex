module.exports = {
  modules: true,
  plugins: [
    require('postcss-preset-env'),
    require('autoprefixer')({ browsers:  ['last 20 versions']}),
    require('postcss-nested'),
    require('postcss-modules')({
      generateScopedName: '_[name]__[local]',
    }),
  ],
};