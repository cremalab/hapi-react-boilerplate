const clientRoutes = require('./routes/clientRoutes')
const WebpackPlugin = require('hapi-webpack-plugin')
const webpack = require('webpack')
const config = require('../../webpack.config.dev.js')

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

  if( process.env !== ('production' || 'test')) {

    const devConfig = options.hmr ? Object.assign({}, config, {
      plugins: [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin()
      ],
      entry: Object.assign({}, config.entry, {
        app: [
          'webpack-hot-middleware/client',
          'react-hot-loader/patch'
        ].concat(config.entry.app)
      })
    }) : config

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
  } else {
    registerRoutes(server, next)
  }
}

exports.register.attributes = {
  name: 'clientApp'
}
