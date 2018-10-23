import config from '../config'
var mongoose = require('mongoose')
let dbConnector = {
  connect: () => {
    mongoose.Promise = global.Promise
    mongoose.connect(config.dbName)
  }
}

module.exports = dbConnector
