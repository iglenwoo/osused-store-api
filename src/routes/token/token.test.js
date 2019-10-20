const request = require('supertest')
const app = require('../../server')

describe('Test token validation', () => {
  test('GET users', done => {
    request(app)
      .post('/checkToken')
      .set('Authorization', 'abc123')
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(400)
        done()
      })
  })
})
