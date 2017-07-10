const handlers = require('../handlers')
const responses = require('../responses')
const Joi = require('joi')

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
  {
    method: 'GET',
    path: '/api/tasks/{id}',
    handler: handlers.show,
    config: {
      auth: false,
      description: 'Returns one task',
      tags: ['api', 'tasks'],
      validate: {
        params: {
          id: Joi.number().required(),
        },
      },
      response: {
        schema: responses.single,
      },
    },
  },
]
