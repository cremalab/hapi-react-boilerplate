const compose = require('../../../serverComposer')

describe('clientAppRoute', () => {
  let server
  beforeAll(() => compose().then((s) => { server = s }))

  test('should return HTML page with react root', () => {
    server.inject({
      method: 'GET',
      url: '/'
    })
      .then((res) => {
        expect(res.statusCode).toEqual(200)
        expect(res.payload).toContain('[data-reactroot]')
      })
  })

  test('should return HTML for all wacky routes', () => {
    server.inject({
      method: 'GET',
      url: '/clowns/1/tricks/35'
    })
      .then((res) => {
        expect(res.statusCode).toEqual(200)
        expect(res.payload).toContain('[data-reactroot]')
      })
  })

  test('should match files for public routes', () => {
    server.inject({
      method: 'GET',
      url: '/public/clowns'
    })
      .then(res => expect(res.statusCode).toEqual(404))
  })

})
