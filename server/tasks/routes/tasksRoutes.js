const handlers = require('../handlers')
const responses = require('../responses')

module.exports = [
  {
    method: 'GET',
    path: '/api/tasks',
    handler: handlers.index,
    config: {
      auth: false,
      description: 'Lists all tasks',
      tags: ['api', 'tasks'],
      response: {
        schema: responses.list,
      },
    },
  },
]
