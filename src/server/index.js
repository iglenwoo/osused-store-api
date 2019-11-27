const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const router = require('../routes')
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
const GridFsStorage = require('multer-gridfs-storage')
const path = require('path')
const crypto = require('crypto')

Promise = require('bluebird')
mongoose.Promise = Promise
require('dotenv').config()

const app = express()
const url =
  process.env.DB_HOST ||
  'mongodb://root:password@localhost:27017/osused-store?authSource=admin'
mongoose.connection.on('error', err => {
  console.error(err)
  throw new Error(`unable to connect to database: ${url}`)
})

var gfs
mongoose.connection.once('open', () => {
  console.log(`connected to database: ${url}`)
  app.db = mongoose.connection
  gfs = Grid(app.db, mongoose.mongo)
  gfs.collection('images')
})

// Create storage engine
const storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = buf.toString('hex') + path.extname(file.originalname)
        const fileInfo = {
          filename: filename,
          bucketName: 'images',
        }
        resolve(fileInfo)
      })
    })
  },
})

const run = async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
}
run().catch(error => console.error(error))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

app.use('/', router)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500).json({
    message: err.message,
    error: err,
  })
})

module.exports = { app, storage }
