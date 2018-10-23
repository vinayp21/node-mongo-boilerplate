import userController from '../user/userController'
import config from '../../config'
const jwt = require('jsonwebtoken')

const userAuthenticator = {
  authenticate: (req, res, next) => {
    if (req.path !== '/user/userLogin') {
      const token = req.headers['authorization']
      jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
          throw new Error('Invaild Token')
        }
        if (req.sessionID === req.cookies['session-id']) {
          userController.getUserById(req, res, decoded.id, (err, data) => {
            if (err) {
              throw new Error(err)
            }
            if (data) {
              next()
            }
          })
        } else {
          throw new Error('Session logged out')
        }
      })
    } else {
      next()
    }
  }
}

module.exports = userAuthenticator
