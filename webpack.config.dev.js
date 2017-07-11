const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  cache: false,
  entry: {
    app: [
      './client/src/index.js',
    ],
    vendor: [
      'babel-polyfill',
      'core-js/es6/promise',
      'whatwg-fetch',
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'client/src')],
    extensions: ['.web.js', '.js', '.jsx'],
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

  // webpack-dev-middleware options
  // See https://github.com/webpack/webpack-dev-middleware
  // assets: {},

  // webpack-hot-middleware options
  // See https://github.com/glenjamin/webpack-hot-middleware
  // hot: {}
}
