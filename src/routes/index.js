const router = require('express').Router()

const home = require('./home')
const { getUser, getUsers } = require('./user')

router.get('/', home)
router.get('/users/:id', getUser)
router.get('/users', getUsers)

module.exports = router
