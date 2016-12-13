var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'client/build');
var APP_DIR = path.resolve(__dirname, 'client/src');

var config = {
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
}

module.exports = config;
