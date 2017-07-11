const clientRoutes = require('./routes/clientRoutes')
const WebpackPlugin = require('hapi-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('../../webpack.config.js')

const assets = {
  // webpack-dev-middleware options
  // See https://github.com/webpack/webpack-dev-middleware
}
const hot = {
  // webpack-hot-middleware options
  // See https://github.com/glenjamin/webpack-hot-middleware
}

function registerRoutes(server, next) {
  server.route(clientRoutes)
  next()
}

exports.register = (server, options, next) => {
  let devConfig = config()
  if (options.hmr) {
    devConfig = merge({
      entry: {
        app: [
          'webpack-hot-middleware/client',
          'react-hot-loader/patch',
        ]
      },
      plugins: [new webpack.HotModuleReplacementPlugin()]
    }, devConfig)
  }

  const compiler = new webpack(devConfig)

  server.register({
    register: WebpackPlugin,
    options: { compiler, assets, hot },
  }, (error) => {
    if (error) {
      return console.error(error)
    }
    registerRoutes(server, next)
  })
}

exports.register.attributes = {
  name: 'clientApp'
}
