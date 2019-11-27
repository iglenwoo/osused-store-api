const router = require('express').Router()
const multer = require('multer')

const home = require('./home')
const { storage } = require('../server')
const { getUsers, postUser, loginUser } = require('./user')
const { getItems, getItem, postItem, editItem, deleteItem } = require('./item')
const { auth, authMid } = require('../middleware/auth')
const { postImage } = require('./image')

const upload = multer({ storage })

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
router.post('/image', upload.single('image-file'), postImage)

module.exports = router
