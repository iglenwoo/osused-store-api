const router = require('express').Router()

const home = require('./home')
const { getUser, getUsers, postUser } = require('./user')

router.get('/', home)

router.get('/users', getUsers)
router.get('/user', getUser)
router.post('/add-user', postUser)

module.exports = router
