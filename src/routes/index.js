const router = require('express').Router()
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')

const home = require('./home')
const { getUsers, postUser, loginUser } = require('./user')
const { getItems, getItem, postItem, editItem, deleteItem } = require('./item')
const { auth, authMid } = require('../middleware/auth')
const { postImage, getImage } = require('./image')
const path = require('path')
const crypto = require('crypto')

const storage = new GridFsStorage({
  url:
    'mongodb://root:password@192.168.99.100:27017/osused-store?authSource=admin',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        let date = new Date()
        const filename =
          file.originalname +
          '/' +
          date.getMonth() +
          '/' +
          date.getDay() +
          '/' +
          date.getFullYear() +
          '/' +
          date.getHours()
        const fileInfo = {
          filename: filename,
          bucketName: 'images',
        }
        resolve(fileInfo)
      })
    })
  },
})

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
router.get('/imgdownload', getImage)

module.exports = router
