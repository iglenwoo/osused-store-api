const router = require('express').Router()

const home = require('./home')
const { getUser, getUsers, postUser, loginUser } = require('./user')

router.get('/', home)

router.get('/users/:id', getUser)
router.get('/users', getUsers)
router.post('/users/signup', postUser)
router.post('/users/login', loginUser)

module.exports = router
