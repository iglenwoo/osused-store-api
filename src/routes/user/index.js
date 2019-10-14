const User = require('../../models/user')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

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

module.exports = {
  getUser,
  getUsers,
}
