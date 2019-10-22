const request = require('supertest')
const app = require('../../server')

describe('Test /users', () => {
  test('GET users', done => {
    request(app)
      .get('/users')
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})

describe('Test users sign up and login success', () => {
  let postUserData = {
    email: 'corvallis@oregonstate.edu',
    password: 'portland',
    firstName: 'Test',
    lastName: 'Hi',
  }
  test('User sign up', function(done) {
    request(app)
      .post('/users/signup')
      .send(postUserData)
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(409)
        done()
      })
  })
  test('User login', function(done) {
    request(app)
      .post('/users/login')
      .send(postUserData)
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})
