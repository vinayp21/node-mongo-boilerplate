import UserModal from './userModal'
import config from '../../config'
const jwt = require('jsonwebtoken')

const userController = {
  addUserData: (req, res) => {
    const userData = {
      user_id: 'qwd',
      user_name: 'vinay',
      password: '12345',
      firstname: 'Vinay',
      lastname: 'P',
      email: 'vinay@gmail.com',
      mobile: 756527875,
      age: 27,
      category: 'category',
      active: 'yes',
      role: 'dev',
      designation: 'con'
    }
    UserModal.create(userData, (err, data) => {
      if (err) {
        throw new Error()
      }
      res.json(data)
    })
  },
  getAllUserInfo: (req, res) => {
    UserModal.find({}, (err, data) => {
      if (err) {
        throw new Error()
      }
      res.json(data)
    })
  },
  getUserById: (req, res, id, callback) => {
    UserModal.findById({ _id: id }, (err, data) => {
      if (err) {
        throw new Error()
      }
      callback(null, data)
    })
  },
  deleteUser: (req, res, id) => {
    UserModal.find({ _id: id }).remove((err, data) => {
      if (err) {
        throw new Error()
      }
      res.json(data)
    })
  },
  updateUserInfo: (req, res, id, newData) => {
    UserModal.update({ _id: id }, newData, (err, data) => {
      if (err) {
        throw new Error()
      }
      res.json(data)
    })
  },
  authenticateUser: (req, res, loginData) => {
    const loginQuery = {
      _id: loginData.userId,
      password: loginData.password
    }
    UserModal.findOne(loginQuery).find((err, data) => {
      if (err) {
        throw new Error()
      }
      res.cookie('session-id', req.sessionID, { httpOnly: false })
      const token = jwt.sign({ id: loginData.userId }, config.secretKey, { expiresIn: '1h' })
      res.json({ data, token })
    })
  }
}

module.exports = userController
