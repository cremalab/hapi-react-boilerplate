const Boom = require('boom')

module.exports = {
  index(request, reply) {
    const { list } = request.server.plugins.tasks
    reply({ result: list })
  },
  show(request, reply) {
    const { list } = request.server.plugins.tasks
    const result = list.find(t => t.id === Number(request.params.id))
    if (result) {
      reply({ result })
    } else {
      reply(Boom.notFound())
    }
  },
}
