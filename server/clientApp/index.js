const clientRoutes = require('./routes/clientRoutes')

exports.register = (server, options, next) => {
  server.route(clientRoutes)
  next()
}

exports.register.attributes = {
  name: 'clientApp'
}
