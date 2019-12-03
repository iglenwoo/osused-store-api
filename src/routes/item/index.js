const Item = require('../../models/item')
const User = require('../../models/user')
let jwt = require('jsonwebtoken')
const config = require('../../../config.js')

const { setQueryCondition, setRespondMsg } = require('../../_help/help')
const ObjectId = require('mongoose').Types.ObjectId

const getItem = async function(req, res, next) {
  try {
    const id = req.params.id
    if (!id.match(/^[0-9a-fA-F]{24}$/) || !ObjectId.isValid(id)) {
      res.status(422).json({ message: `ID [${id}] is not valid` })
    }

    const item = await Item.findById(id)
    const authStr =
      req.headers['x-access-token'] || req.headers['authorization']
    if (!authStr) return setRespondMsg(res, 422, 'No token in headers').end()

    const bearers = authStr.split(' ')
    if (bearers.length < 2)
      return setRespondMsg(
        res,
        400,
        'Auth token is not supplied as in `bearer [TOKEN]`'
      ).end()

    const token = bearers[1]
    jwt.verify(token, config.secret, async function handle(err, decoded) {
      if (err) return setRespondMsg(res, 401, 'Token is not valid').end()

      const user = await User.findById(item.ownerId)
      item._doc.ownerMail = user.email
      item._doc.ownerName = `${user.firstName} ${user.lastName}`
      console.log('item', item)
      console.log('user', user)
      res.status(200).json(item)
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

const getItems = async function(req, res) {
  try {
    query = {}
    setQueryCondition(query, 'category', req.query.category)
    setQueryCondition(query, 'name', req.query.name, 'i')
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
    if (result.ok !== 1) {
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
