const Item = require('../../models/item')
const User = require('../../models/user')

const { setQueryCondition, setRespondMsg } = require('../../_help/help')
const ObjectId = require('mongoose').Types.ObjectId

const getItem = async function(req, res, next) {
  try {
    const id = req.params.id
    if (id.match(/^[0-9a-fA-F]{24}$/) && ObjectId.isValid(id)) {
      const items = await Item.findById(id)
      res.status(200).json(items)
    }

    res.status(422)
    next()
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

const getItems = async function(req, res) {
  try {
    query = {}
    setQueryCondition(query, 'category', req.query.category)
    setQueryCondition(query, 'name', { $regex: req.query.name, $options: 'i' })
    const items = await Item.find(query)
    res.status(200).json(items)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

const postItem = async function(req, res) {
  try {
    const user = await User.findOne({ email: req.decoded.email })
    req.body.ownerId = user._id
    const newItem = await Item.create(req.body)
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

const deleteItem = async function(req, res) {
  try {
    const item = await Item.findById(req.params.id).exec()
    const result = await Item.deleteOne(item)
    if (result.ok !== 1){
      throw new Error('Deleting an item failed')
    }
    res.status(200).send(item)
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
  deleteItem,
}
