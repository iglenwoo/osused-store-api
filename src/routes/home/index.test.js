const request = require('supertest')
const app = require('../../server')

describe('Test the root path', () => {
  test('It should response the GET method', done => {
    request(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
  test('It should response a json type', done => {
    const homeRes = { home: 'ok' }

    request(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.text)).toEqual(homeRes)
        done()
      })
  })
})
