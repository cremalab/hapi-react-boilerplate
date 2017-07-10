const compose = require('../../../serverComposer')

describe('tasks routes', () => {
  let server
  beforeAll(() => compose().then((s) => { server = s }))

  describe('show', () => {
    test('should return task when found', () => {
      server.inject({
        method: 'GET',
        url: '/api/tasks/1',
      })
        .then((res) => {
          expect(res.statusCode).toEqual(200)
          expect(res.payload.result.id).toBe(1)
        })
    })

    test('should return error when found', () => {
      server.inject({
        method: 'GET',
        url: '/api/tasks/999',
      })
        .then((res) => expect(res.statusCode).toEqual(404))
    })

    test('should return error when id is wrong type', () => {
      server.inject({
        method: 'GET',
        url: '/api/tasks/hello',
      })
        .then((res) => expect(res.statusCode).toEqual(400))
    })
  })

})
