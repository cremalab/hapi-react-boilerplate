// Tasks plugin, registers routes, route handlers, and other stuff.
// Go to http://localhost:8000/documentation#!/api/getApiTasks to see
// auto-generated API endpoint documentation

const tasksRoutes = require('./routes/tasksRoutes')

const tasks = [
  { completed: false, title: 'Clone boilerplate' },
  { completed: false, title: 'Read README' },
  { completed: false, title: 'Remove junk' },
]

exports.register = (server, options, next) => {
  server.expose('list', tasks)
  server.route(tasksRoutes)
  next()
}

exports.register.attributes = {
  name: 'tasks'
}
