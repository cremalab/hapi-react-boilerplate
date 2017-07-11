const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ResourceHintsWebpackPlugin = require('resource-hints-webpack-plugin')
const merge = require('webpack-merge')
const webpack = require('webpack')
const parts = require('./webpack.parts')


const resolveEnv = env => (a, b) =>
  env === 'prod' ? a : b

module.exports = env => {

  console.log('Webpack building with env=' + env)
  const isProd = resolveEnv(env)
  return {
    entry: {
      app: './client/src/index.js',
      vendor: [
        'babel-polyfill',
        'core-js/es6/promise',
        'whatwg-fetch',
      ]
    },
    output: {
      filename: isProd('[name].[hash].js', '[name].js'),
      path: path.resolve(__dirname, './client/build'),
      publicPath: '/public/'
    },
    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(isProd('production', 'development'))
        }
      }),
      ...isProd(
        [
          new webpack.optimize.UglifyJsPlugin({
            comments: false,
            beautify: false,
            sourceMap: false,
            compress: {
              warnings: false,
              screw_ie8: true,
              dead_code: true,
              unused: true
            }
          }) ,
          new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
          new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks: Infinity,
            filename: '[name].[hash].js'
          }),
        ],
        []
      ),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          context: __dirname
        }
      }),
      new HtmlWebpackPlugin({
        template: './client/public/index.html',
        filename: 'index.html',
        inject: 'body',
      }),
      new ExtractTextPlugin('styles.css'),
    ],
    resolve: {
      modules: ['node_modules', path.resolve(__dirname, 'client/src')],
      extensions: ['.webpack.js', '.web.js', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: 'css-loader',
          }),
        },
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader?' + JSON.stringify({
            name: '[name]_[hash]',
            prefixize: true
          })
        }
      ],
    },
  }
}


