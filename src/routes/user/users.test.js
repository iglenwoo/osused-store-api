const request = require('supertest')
const app = require('../../server')
const User = require('../../models/user')

const mockUser = {
  email: 'corvallis@oregonstate.edu',
  password: 'portland',
  firstName: 'Test',
  lastName: 'Hi',
}

describe('Test /users', () => {
  test('GET users', done => {
    request(app)
      .get('/users')
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })

  test('User sign up with new user', done => {
    request(app)
      .post('/users/signup')
      .send(mockUser)
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
  test('User sign up with an existing user', done => {
    request(app)
      .post('/users/signup')
      .send(mockUser)
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(409)
        done()
      })
  })
  test('User login', done => {
    request(app)
      .post('/users/login')
      .send(mockUser)
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })

  afterAll(async () => {
    await User.deleteOne({ email: mockUser.email }, () => {
      console.info(`Email ${mockUser.email} removed.`)
    })

    await app.db.close()
  })
})
