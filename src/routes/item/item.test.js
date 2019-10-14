const request = require('supertest')
const app = require('../../server')

describe('Test the root path', () => {
  test('It should response the POST method', done => {
    request(app)
      .post('/post-sell-item')
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})
