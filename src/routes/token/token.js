let jwt = require('jsonwebtoken')
const config = require('../../../config.js')

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']

  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length)
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: 'Token is not valid' })
      } else {
        req.decoded = decoded
        return res
          .status(200)
          .json({ success: true, message: 'Token is valid' })
      }
    })
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'Auth token is not supplied' })
  }
}

module.exports = {
  checkToken: checkToken,
}
