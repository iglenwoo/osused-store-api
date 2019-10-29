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
    res.status(500).json({ message: err.message })
  }
}

const loginUser = async (req, res) => {
  try {
    let email = req.body.email
    let password = req.body.password

    const user = await User.findOne({ email: email })
    if (user === null) {
      res.statusMessage = 'User is not found!!'
      res.status(409).end()
    }

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        res.statusMessage = err
        res.status(500).end()
      }

      if (match) {
        let token = jwt.sign({ email: email }, config.secret, {
          expiresIn: '24h',
        })
        res.status(200).json({
          user,
          token,
        })
      } else {
        res.statusMessage = 'passwords do not match'
        res.status(409).end()
      }
    })
  } catch (err) {
    res.statusMessage = err.message
    res.status(500).end()
  }
}

const postUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)

    //If data is not found then insert
    let newUser = await User.findOneAndUpdate(
      { email },
      {
        $setOnInsert: {
          password: hash,
          firstName,
          lastName,
        },
      },
      { upsert: true, new: true, rawResult: true }
    )

    if (newUser.lastErrorObject.updatedExisting !== true) {
      const token = jwt.sign({ email }, config.secret, {
        expiresIn: '24h',
      })
      res.status(200).json({
        user: {
          email,
        },
        token,
      })
    } else {
      res.statusMessage = 'The account is exist!!'
      res.status(409).end()
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getUser,
  getUsers,
  postUser,
  loginUser,
}
