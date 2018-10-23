var mongoose = require('mongoose')
var Schema = mongoose.Schema

const userSchema = new Schema({
  user_id: String,
  user_name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: String,
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  active: {
    type: String,
    required: true,
    default: 1
  },
  role: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  }
})

const user = mongoose.model('user', userSchema)
module.exports = user
