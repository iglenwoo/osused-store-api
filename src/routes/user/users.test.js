const request = require('supertest')
const app = require('../../server')

describe('Test /users', () => {
  // test('GET a user', done => {
  //   request(app)
  //     .get('/users/1')
  //     .then(response => {
  //       expect(response.statusCode).toBe(200)
  //       done()
  //     })
  // })
  test('GET users', done => {
    request(app)
      .get('/users')
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})
