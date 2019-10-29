const request = require('supertest')
const app = require('../../server')

describe('Test /explore', () => {
  test('GET items', done => {
    request(app)
      .get('/explore/123')
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})
