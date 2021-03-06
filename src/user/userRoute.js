import userController from './userController'

const router = require('express').Router()

router.get('/users', (req, res) => {
//   res.send('GET handler for /dogs route.')
  userController.getAllUserInfo(req, res, (data) => {
    res.json(data)
  })
})

router.get('/user/:id', (req, res) => {
  const id = req.params.id
  userController.getUserById(req, res, id, (data) => {
    if (err) {
      throw new Error(err)
    }
    res.json(data)
  })
})

router.post('/sign-in', (req, res) => {
  const { loginData } = req.body
  console.log(loginData)
  userController.authenticateUser(req, res, loginData, (data) => {
    res.json(data)
  })
})

router.post('/user', (req, res) => {
  userController.addUserData(req, res, (data) => {
    res.json(data)
  })
})

router.delete('/user', (req, res) => {
  const id = req.body.userId
  userController.deleteUser(req, res, id, (data) => {
    res.json(data)
  })
})

router.put('/user', (req, res) => {
  const id = req.body.userId
  const newData = req.body.newData
  userController.updateUserInfo(req, res, id, newData, (data) => {
    console.log(data);
    res.json(data)
  })
})

router.put('/logout', (req, res) => {
  const id = req.body.userId
  
  userController.logout(req, res, id)
})

module.exports = router
