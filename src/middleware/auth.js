let jwt = require('jsonwebtoken')
const config = require('../../config.js')
const { setRespondMsg } = require('../_help/help')

const checkToken = (req, res, token) => {
  if (!token) setRespondMsg(res, 400, 'Auth token is not supplied').end()

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) setRespondMsg(res, 401, 'Token is not valid').end()
    req.decoded = decoded
  })
}

const authorizationMiddleware = async function(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization']
  checkToken(req, res, token)
  if (!res.finished) next()
}

const authorization = async function(req, res) {
  let token = req.headers['x-access-token'] || req.headers['authorization']
  checkToken(req, res, token)
  if (!res.finished)
    setRespondMsg(res, 200, 'Token is pass').json({ email: req.decoded.email })
}

module.exports = {
  authMid: authorizationMiddleware,
  auth: authorization,
}
