module.exports = {
  index(request, reply) {
    const { list } = request.server.plugins.tasks
    reply({ result: list })
  },
}
