const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = require('../user')

const itemSchema = new Schema({
  name: {
    type: String,
    index: true,
  },
  category: {
    type: String,
  },
  location: {
    type: String,
    price: {
      type: Number,
    },
  },
  description: {
    type: String,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('User', itemSchema, 'users')
