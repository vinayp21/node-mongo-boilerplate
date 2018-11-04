import userController from '../user/userController'
import config from '../../config'
const jwt = require('jsonwebtoken')
import generator from './responseGenerator'; 

const userAuthenticator = {
  authenticate: (req, res, next) => {
    if (req.path !== '/api/sign-in') {
      const token = req.headers['authorization']
      jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
          res.status(401)
          res.json(generator.errorResponse('Invaild Token'))
          return null
        }
        if (req.sessionID === req.cookies['session-id']) {
          userController.getUserById(req, res, req.session.userId, (data) => {
            if (data) {
              next()
            }
          })
        } else {
          res.status(401)
          res.json(generator.errorResponse('Session logged out'))
          return null
        }
      })
    } else {
      next()
    }
  }
}

module.exports = userAuthenticator
