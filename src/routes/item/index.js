const postSellItem = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  var name = req.body.name
  console.log(req)
  res.json({ status: 0, name: name })
}

module.exports = {
  postSellItem,
}
