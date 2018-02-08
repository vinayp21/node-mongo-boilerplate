var mongoose = require('mongoose');
let dbConnector= {
  connect: () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/graphqlTest');
  }
};

module.exports=dbConnector;
