const User = require('../../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getUser = async (req, res, next) => {
  try {
    let email = req.query.email
    const user = await User.find({ email: email })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const postUser = async (req, res, next) => {
  try {
    let newUser = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $setOnInsert: {
          password: bcrypt.hashSync(
            req.body.password,
            bcrypt.genSalt(saltRounds)
          ),
        },
      },
      { upsert: true, new: true, rawResult: true }
    )

    res.status(200).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = {
  getUser,
  getUsers,
  postUser,
}
