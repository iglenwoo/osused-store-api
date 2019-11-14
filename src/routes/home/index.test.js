const request = require('supertest')
const app = require('../../server')
const mongoose = require('mongoose')

describe('Test the root path', () => {
  test('It should response the GET method', async done => {
    request(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
  test('It should response a json type', async done => {
    const homeRes = { home: 'ok' }

    request(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.text)).toEqual(homeRes)
        done()
      })
  })
  afterAll(async done => {
    // await app.db.close()
    // await mongoose.connection.close()
    await mongoose.disconnect()
    // done()
  })
})
