const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ImageShema = new Schema({
  imageName: {
    type: String,
    default: 'none',
    required: true,
  },
  imageData: {
    type: String,
    required: true,
  },
})

var Image = mongoose.model('Image', ImageShema)
module.exports = Image
