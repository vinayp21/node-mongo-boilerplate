'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', function(client){
	client.on('join', function(name){
		client.nickname=name;
	});
	client.on('messages',function(data){
	var obj={
		msg:data,
		sender:client.nickname
	}
	client.broadcast.emit('messages',obj);
	var senderobj={
		msg:data,
		sender:'You'
	}
	client.emit('messages',senderobj);
	});

});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
