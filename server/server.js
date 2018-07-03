const path = require('path');

const http = require('http');

const express = require('express');

const socketIO = require('socket.io');

const publicPath = path.join(__dirname , '../public');

const port = process.env.PORT || 3000;

const {generateMessage} = require('./utils/message');

const {generateLocationMessage} = require('./utils/message');

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('New user connected');

  socket.on('disconnect' , ()=> {
    console.log('Disconnected from client');
  });

  socket.on('createLocationMessage',(coords) => {
    
    io.emit('newLocationMessage', generateLocationMessage('User' ,coords.longitude, coords.latitude));

  });


  io.emit('newMessage',generateMessage('Admin','Welcome to chat app'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));



  socket.on('createMessage',(message)=> {

    console.log('New message' , message);


    io.emit('newMessage', generateMessage(message.from,message.text));
/*
    socket.broadcast.emit('newMessage', {
      from:message.from,
      text:message.text,
      createdAt:new Date().getTime()
    });
    */
  })



});

server.listen(port , () => {
  console.log(`Server is running on port ${port}`);
})

console.log(publicPath);
