const home = function(req, res, next) {
  res.status(200).json({
    home: 'ok',
  })
}

module.exports = home
