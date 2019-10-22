const router = require('express').Router()

const home = require('./home')
const { getUsers, postUser, loginUser } = require('./user')
const { checkToken } = require('../middleware/auth')

router.get('/', home)
router.post('/users/signup', postUser)
router.post('/users/login', loginUser)
router.get('/users', getUsers)

router.get('/checkTokenExp', checkToken, home)

module.exports = router
