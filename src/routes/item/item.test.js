const request = require('supertest')
const app = require('../../server')

describe('Test /items', () => {
  test('GET items', done => {
    request(app)
      .get('/items')
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })

  const mockItem = {
    name: 'mock item 1',
    category: 'cloth',
    location: {
      type: 'location 1',
      price: 100,
    },
    description: 'This is a mock item',
    ownerId: '111111111',
  }

  test('POST item', () => {
    request(app)
      .post('/items')
      .send(mockItem)
      .set('Accept', 'application/json')
      .then(res => {
        expect(res.statusCode).toBe(200)
      })
  })
})
