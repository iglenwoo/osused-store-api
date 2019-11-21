const router = require('express').Router()

const home = require('./home')
const { getUsers, postUser, loginUser } = require('./user')
const { getItems, getItem, postItem, editItem, deleteItem } = require('./item')
const { auth, authMid } = require('../middleware/auth')

router.get('/', home)
router.post('/users/signup', postUser)
router.post('/users/login', loginUser)
router.get('/users', getUsers)

router.get('/items', getItems)
router.get('/items/:id', getItem)
router.post('/items', authMid, postItem)
router.put('/items/:id', editItem)
router.delete('/items/:id', authMid, deleteItem)
router.get('/chkToken', auth)
router.get('/tokenTest', authMid, home)

module.exports = router
