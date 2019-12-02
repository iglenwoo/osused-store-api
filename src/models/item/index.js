const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageName: {
    type: String,
  },
  imageId: {
    type: Schema.Types.ObjectId,
  },
})

module.exports = mongoose.model('Item', itemSchema, 'items')
