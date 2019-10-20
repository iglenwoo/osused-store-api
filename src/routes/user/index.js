const User = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../../config.js')
const saltRounds = 10

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id
    if (!ObjectId.isValid(id)) {
      res.status(422)
      next()
    }
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

const loginUser = async (req, res) => {
  try {
    let email = req.body.email
    let password = req.body.password
    const user = await User.findOne({ email: email })
    bcrypt.compare(password, user.password, (err, decoded) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: 'Pass word is not match!!' })
      } else {
        let token = jwt.sign({ email: email }, config.secret, {
          expiresIn: '24h',
        })
        return res.status(200).json(token)
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

const postUser = async (req, res, next) => {
  try {
    let salt = bcrypt.genSaltSync(saltRounds)
    let hash = bcrypt.hashSync(req.body.password, salt)

    let newUser = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $setOnInsert: {
          password: hash,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        },
      },
      { upsert: true, new: true, rawResult: true }
    )

    if (newUser.lastErrorObject.updatedExisting !== true)
      res.status(200).json(newUser)
    else res.status(400).json({})
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getUser,
  getUsers,
  postUser,
  loginUser,
}
