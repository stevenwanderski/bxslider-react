var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: 'index_bundle.js'
  },
  resolve: {
    root: APP_DIR,
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      },
      {
         test: /\.(jpe?g|png|gif|svg)$/i,
         loaders: [
           'url?limit=8192',
           'img'
         ]
     }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index-template.html',
      favicon: 'src/images/icon-star.png'
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('production'),
        'API_URL': JSON.stringify(process.env.API_URL),
        'BABEL_ENV': JSON.stringify(process.env.BABEL_ENV),
        'SENTRY_KEY': JSON.stringify(process.env.SENTRY_KEY)
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  devtool: 'source-map'
};

module.exports = config;
