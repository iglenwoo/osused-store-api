let jwt = require('jsonwebtoken')
const config = require('../../config.js')
const { setRespondMsg } = require('../_help/help')
const User = require('../models/user')

const checkToken = (req, res, token) => {
  if (!token) return setRespondMsg(res, 400, 'Auth token is not supplied').end()

  jwt.verify(token, config.secret, async function handle(err, decoded) {
    if (err) return setRespondMsg(res, 401, 'Token is not valid').end()
    req.decoded = decoded
  })
}

const authorizationMiddleware = async function(req, res, next) {
  const authStr = req.headers['x-access-token'] || req.headers['authorization']
  const bearers = authStr.split(' ')
  if (bearers.length < 2)
    return setRespondMsg(
      res,
      400,
      'Auth token is not supplied as in `bearer [TOKEN]`'
    ).end()
  checkToken(req, res, bearers[1])
  if (!res.finished) next()
}

const authorization = async function(req, res) {
  let token = req.headers['x-access-token'] || req.headers['authorization']
  checkToken(req, res, token)
  if (res.finished) return

  const user = await User.findOne({ email: req.decoded.email })
  setRespondMsg(res, 200, 'Token is pass').json({
    userId: user._id,
    email: req.decoded.email,
  })
}

module.exports = {
  authMid: authorizationMiddleware,
  auth: authorization,
}
