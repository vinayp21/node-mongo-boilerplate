import userController from '../user/userController'
import config from '../../config'
const jwt = require('jsonwebtoken')

const userAuthenticator = {
  authenticate: (req, res, next) => {
    if (req.path !== '/api/sign-in') {
      const token = req.headers['authorization']
      jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
          res.status(401)
          throw new Error('Invaild Token')
        }
        if (req.sessionID === req.cookies['session-id']) {
          userController.getUserById(req, res, req.session.userId, (err, data) => {
            if (err) {
              res.status(500)
              throw new Error(err)
            }
            if (data) {
              next()
            }
          })
        } else {
          res.status(401)
          throw new Error('Session logged out')
        }
      })
    } else {
      next()
    }
  }
}

module.exports = userAuthenticator
