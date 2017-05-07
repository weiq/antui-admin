let webpack = require('webpack');
let path = require('path');
let autoprefixer = require('autoprefixer');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'example'),
  entry: {
    js: ['./app.js'],
    vendor: ['react', 'classnames', 'react-router', 'react-dom', 'react-addons-css-transition-group']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
        }
      }, {
        test: /\.less$/,
        loader: 'style!css!postcss!less'
      }, {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('style', 'css', 'postcss')
      }, {
        test: /\.(png|jpg|svg)$/,
        loader: 'url?limit=25000'
      }
    ]
  },
  postcss: [autoprefixer],
  plugins: [
    new webpack.DefinePlugin({
      DEBUG: process.env.NODE_ENV !== 'production'
    }),
    new ExtractTextPlugin('antui-admin.min.css'),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    // new webpack.optimize.UglifyJsPlugin({
    //     sourceMap: false,
    //     mangle: false
    // }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'example/index.html')
    }),
  ]
};