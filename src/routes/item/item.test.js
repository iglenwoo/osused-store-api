const request = require('supertest')
const app = require('../../server')
const Item = require('../../models/item')
const User = require('../../models/user')

const mockUser = {
  email: 'seller@oregonstate.edu',
  password: 'password',
  firstName: 'Seller',
  lastName: 'Tom',
}

const mockItem = {
  name: 'mock item 1',
  category: 'cloth',
  location: 'location 1',
  price: 100,
  description: 'This is a mock item',
  ownerId: undefined,
}

describe('Test /items', () => {
  test('GET items', done => {
    request(app)
      .get('/items')
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })

  test('POST item', async done => {
    const user = await User.create(mockUser)
    mockItem.ownerId = user._id

    request(app)
      .post('/items')
      .send(mockItem)
      .set('Accept', 'application/json')
      .then(res => {
        expect(res.statusCode).toBe(200)
        done()
      })
  })

  test('Get Mock item 1', async done => {
    request(app)
      .get(`/items?name=${mockItem.name}&category=${mockItem.category}`)
      .set('Accept', 'application/json')
      .then(res => {
        expect(res.statusCode).toBe(200)
        done()
      })
  })

  afterAll(async () => {
    await User.deleteOne({ email: mockUser.email }, () => {
      console.info(`User ${mockUser.email} removed.`)
    })

    await Item.deleteOne(
      {
        name: mockItem.name,
        ownerId: mockItem.ownerId,
      },
      () => {
        console.info(`Item ${mockItem.name} removed.`)
      }
    )
  })
})
