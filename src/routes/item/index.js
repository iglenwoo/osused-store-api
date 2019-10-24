const Item = require('../../models/item')

const getItem = async function(req, res, next) {
  try {
    const id = req.params.id
    if (!ObjectId.isValid(id)) {
      res.status(422)
      next()
    }
    const items = await Item.findById(id)
    res.status(200).json(items)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

const getItems = async function(req, res) {
  try {
    const items = await Item.find()
    res.status(200).json(items)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

const postItem = async function(req, res) {
  try {
    const newItem = new Item.create(req.body)
    res.status(200).json(newItem)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

const editItem = async function(req, res) {
  try {
    const item = await Item.findById(req.params.id).exec()
    item.set(req.body)
    const result = await item.save()
    res.status(200).send(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getItem,
  getItems,
  postItem,
  editItem,
}
