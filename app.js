let dbConnector = require('./db/connector');
import Forum from './db/schema/forum';
let express = require('express');
let app= express();

dbConnector.connect();
app.get('/',(req,res) => {
  let data={
    question:'String',
    topic:'String',
    askedBy:'String',
    dateTime:null,
    answer:[{
      id:'String',
      answer:'String',
      answerBy:'String',
      dateTime:null
    }]
  };
  Forum.create(data,(err, data) => {
    if(err){
      res.json('error');
    }
    res.json(data);
  });

})
app.listen(1111,() => {
  console.log('Example app listening on port 1111!')
})
