const Item = require('../../models/item')
const getItemsByCategory = async function(req, res) {
  try {
    const items = await Item.find({ category: req.params.category })
    res.status(200).json(items)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getItemsByCategory,
}
