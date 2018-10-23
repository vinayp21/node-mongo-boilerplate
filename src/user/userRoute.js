import userController from './userController'

const router = require('express').Router()

router.get('/', (req, res) => {
//   res.send('GET handler for /dogs route.')
  userController.getAllUserInfo(req, res)
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  userController.getUserById(req, res, id, (err, data) => {
    if (err) {
      throw new Error(err)
    }
    res.json(data)
  })
})

router.post('/userLogin', (req, res) => {
  const { loginData } = req.body
  console.log(loginData)
  userController.authenticateUser(req, res, loginData)
})

router.post('/addUser', (req, res) => {
  userController.addUserData(req, res)
})

router.delete('/deleteUser', (req, res) => {
  const id = req.body.userId
  userController.deleteUser(req, res, id)
})

router.put('/updateUser', (req, res) => {
  const id = req.body.userId
  const newData = req.body.newData
  userController.updateUserInfo(req, res, id, newData)
})

module.exports = router
