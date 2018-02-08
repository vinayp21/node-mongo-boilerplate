//let dbConnector = require('./db/connector');
//import Forum from './db/schema/forum';
let express = require('express');
let app= express();
var path    = require("path");


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
//dbConnector.connect();
 //app.get('/',(req,res) => {
//   let data={
//     question:'String',
//     topic:'String',
//     askedBy:'String',
//     dateTime:null,
//     answer:[{
//       id:'String',
//       answer:'String',
//       answerBy:'String',
//       dateTime:null
//     }]
//   };
//   Forum.create(data,(err, data) => {
//     if(err){
//       res.json('error');
//     }
//     res.json(data);
//   });
//res.sendFile('./index.html');
//})
app.listen(1111,() => {
  console.log('Example app listening on port 1111!')
})
