const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ResourceHintsWebpackPlugin = require('resource-hints-webpack-plugin')
const merge = require('webpack-merge')
const webpack = require('webpack')
const parts = require('./webpack.parts')

//https://github.com/raquo/minimal-hapi-react-webpack

const resolveEnv = env => (a, b) =>
  env === 'prod' ? a : b

const PATHS = {
  app: './client/src/index.js',
  build:path.resolve(__dirname, './client/build')
}

const isProd = env => resolveEnv(env)
const commonConfig = merge({

  entry: {
    app: PATHS.app,
    vendor: [
      'babel-polyfill',
      'core-js/es6/promise',
      'whatwg-fetch',
      'react',
    ]
  },
  output: {
    path:path.resolve(__dirname, './client/build'),
    filename: '[name].[hash].js',
    publicPath: '/public/'
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'client/src')],
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx'],
  },
  plugins: [

    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new ResourceHintsWebpackPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is Now ready'],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      onErrors: function (severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
        console.log('ERRORS ---> ', errors)
      },
      // should the console be cleared between each compilation?
      // default is true
      clearConsole: true,

      // add formatters and transformers (see below)
      additionalFormatters: [],
      additionalTransformers: []
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: __dirname
      }
    }),
    new ExtractTextPlugin('styles.css'),
  ],

})

const productionConfig = merge([


  {
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name:['vendor']
      }),
    ]
  },
  parts.generateSourceMaps({type:'source-map'}),
  parts.loadCSS(),
  parts.loadSVG(),
  parts.loadJavascript({include:PATHS.app, exclude: /(node_modules|bower_components)/}),
])

const developmentConfig = merge([
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
  },
  parts.generateSourceMaps({type:'cheap-module-eval-source-map'}),
  parts.loadImages({
    options: {
      limit: 25000,
      name:'[path][name].[hash].ext'
    }
  }),
  parts.loadSVG(),
  parts.loadJavascript({include:PATHS.app, exclude: /(node_modules|bower_components)/}),
  parts.loadCSS(),
  parts.loadLess(),

])


module.exports = (env)=> {
  console.log('ENVIRONMENT ::::::::: >>>>>>> ', env)
  if(env === 'prod' ){
    return merge(commonConfig, productionConfig)
  }
  return merge(commonConfig, developmentConfig)
}
