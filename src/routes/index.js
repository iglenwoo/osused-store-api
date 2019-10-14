const router = require('express').Router()

const home = require('./home')
const { getUser, getUsers } = require('./user')
const { postSellItem } = require('./item')

router.get('/', home)
router.get('/users/:id', getUser)
router.get('/users', getUsers)
router.post('/post-sell-item', postSellItem)

module.exports = router
