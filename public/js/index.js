  var socket = io();

  socket.on('connect', function() {
    console.log("Connected to server");

    socket.emit('createMessage' , {
      to:"Shyam",
      text:"I'm fine"
    });
  });

  socket.on('newMessage',function(message) {
    console.log("New message " ,message);
  });

  socket.on('disconnect', function(){
    console.log("Disconnected from server");
  });

;
