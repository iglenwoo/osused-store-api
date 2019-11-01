const router = require('express').Router()

const home = require('./home')
const { getUsers, postUser, loginUser } = require('./user')
const {
  getItems,
  getItem,
  postItem,
  editItem,
  getItemsByConditions,
} = require('./item')
const { checkToken } = require('../middleware/auth')

router.get('/', home)
router.post('/users/signup', postUser)
router.post('/users/login', loginUser)
router.get('/users', getUsers)

router.get('/items', getItems)
router.get('/items/:id', getItem)
router.get('/items/query', getItemsByConditions)
router.post('/items', postItem)
router.put('/items/:id', editItem)

router.get('/checkTokenExp', checkToken, home)

module.exports = router
