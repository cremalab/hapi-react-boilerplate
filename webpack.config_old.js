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

// const PATHS = {
//   app: path.join(__dirname, 'client/src/index.js'),
//   build:path.join(__dirname, 'client/build')
// }
//
// const isProd = env => resolveEnv(env)
//
// const commonConfig = merge([
//   {
//     entry: {
//       app: './client/src/index.js',
//       vendor: [
//         'babel-polyfill',
//         'core-js/es6/promise',
//         'whatwg-fetch',
//       ]
//     },
//     output: {
//       filename: isProd('[name].[hash].js', '[name].js'),
//       path: path.resolve(__dirname, './client/build'),
//       publicPath: '/public/'
//     },
//     node: {
//       net: 'empty',
//       tls: 'empty',
//       dns: 'empty'
//     },
//     plugins: [
//       new HtmlWebpackPlugin({
//         title:'Crema Hapi Webpack Boilerplate',
//         template: './client/public/index.html',
//         filename: 'index.html',
//         inject: 'body',
//       }),
//       new ResourceHintsWebpackPlugin(),
//       new webpack.HotModuleReplacementPlugin(),
//       new webpack.NoEmitOnErrorsPlugin(),
//       new webpack.NamedModulesPlugin(),
//       new FriendlyErrorsWebpackPlugin({
//         compilationSuccessInfo: {
//           messages: ['You application is running here http://localhost:3000'],
//           notes: ['Some additionnal notes to be displayed unpon successful compilation']
//         },
//         onErrors: function (severity, errors) {
//           // You can listen to errors transformed and prioritized by the plugin
//           // severity can be 'error' or 'warning'
//         },
//         // should the console be cleared between each compilation?
//         // default is true
//         clearConsole: true,
//
//         // add formatters and transformers (see below)
//         additionalFormatters: [],
//         additionalTransformers: []
//       })
//     ]
//   }
// ]
// )
//
// const productionConfig = merge([])
// const developmentConfig = merge([
//   parts.loadImages({
//     options: {
//       limit: 25000,
//       name:'[path][name].[hash].ext'
//     }
//   }),
//   parts.loadJavascript({include:PATHS.app, exclude:/(node_modules|bower_components)/}),
//   parts.loadCSS()
// ])

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

// module.exports = (env)=> {
//   console.log('ENV: ', env)
//   if(env === 'production' ){
//     return merge(commonConfig, productionConfig)
//   }
//   return merge(commonConfig, developmentConfig)
// }

