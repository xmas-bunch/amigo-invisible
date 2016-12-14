let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let path = require('path');

let BUILD_DIR = path.resolve(__dirname, 'client/build');
let APP_DIR = path.resolve(__dirname, 'client/src');

let config = {
  entry: APP_DIR + '/index.js',

  output: {
    filename: 'static/js/bundle.js',
    path: BUILD_DIR
  },

  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
    ]
  },

  plugins: [
    new ExtractTextPlugin(
      "static/css/bundle.css"
    ),
    new HtmlWebpackPlugin({
      template: 'client/public/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
};

module.exports = config;
