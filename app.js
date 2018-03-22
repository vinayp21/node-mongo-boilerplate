let dbConnector = require('./db/connector');
import Forum from './db/schema/forum';
let express = require('express');
let app= express();
var path    = require("path");
var multer= require('multer');
var upload= multer({dest:'./uploads'})
let server= require('http').createServer(app);
let io= require('socket.io')(server);
let PORT=process.env.PORT || 1111
// app.post('/upload', upload.single('test'), function(req, res, next){
//
// })
app.use('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
// app.get('/test',function(req,res){
//   res.send('Test Screen');
//   //__dirname : It will resolve to your project folder.
// });
// dbConnector.connect();
//  app.get('/',(req,res) => {
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
//     console.log('2232')
//     res.json(data);
//   });
// //res.sendFile('./index.html');
// })
server.listen(PORT,() => {
  console.log(`Example app listening on port ${PORT}`)
})
io.on('connection', function(socket){
  socket.emit('news', { hello: 'world' });
  socket.on('client', function(data){
    console.log(data);
    socket.emit('news', { hello: 'hi' });
  })
})
