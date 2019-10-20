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

describe('Test users sign up and login success', () => {
  let postUserData = {
    email: 'corvallis@oregonstate.edu',
    password: 'portland',
    firstName: 'Test',
    lastName: 'Hi',
  }
  test('POST a user', function(done) {
    request(app)
      .post('/users/signup')
      .send(postUserData)
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(400)
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
