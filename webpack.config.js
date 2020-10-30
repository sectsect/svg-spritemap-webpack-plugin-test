const webpack = require('webpack');
const path = require('path');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'dist');

const jsPlugins = () => {
  const plugins = [];

  plugins.push(
    new SVGSpritemapPlugin(path.resolve(sourcePath, 'assets/svg/**/*.svg'), {
      output: {
        filename: '../../../dist/assets/svg/symbol.svg',
        svgo: {
          plugins: [
            { removeTitle: false },
            { removeAttrs: { attrs: 'fill' } },
            { removeStyleElement: true },
          ],
        },
      },
      sprite: {
        prefix: 'icon-',
      },
    }),
  );
  return plugins;
};

module.exports = () => [
  {
    entry: {"hello": path.resolve(sourcePath, 'assets/js/hello.js')},
    output: {
      path: path.resolve(buildPath, 'assets/js'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      modules: ['node_modules'],
    },
    plugins: jsPlugins(),
  },
];
