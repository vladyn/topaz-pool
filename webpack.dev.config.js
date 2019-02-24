const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const PORT = 3000;

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    documentation: './documentation/doc.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }, {
      test: /\.scss$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" },
        { loader: "sass-loader" },
      ],
    },
    {
      test: /\.svg/,
      use: 'svg-url-loader',
    }],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: [
      path.join(__dirname, 'dist'),
      path.join(__dirname, 'lib'),
      path.join(__dirname, 'static'),
    ],
    hot: true,
    port: PORT,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      excludeAssets: [/doc.js/],
    }),
    new HtmlWebpackPlugin({
      filename: 'doc.html',
      template: 'documentation/doc.html',
      excludeAssets: [/index.js/],
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
