  var socket = io();

  socket.on('connect', function() {
    console.log("Connected to server");
  });

  socket.on('newMessage',function(message) {
    console.log("New message " ,message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
  });

  socket.on('disconnect', function(){
    console.log("Disconnected from server");
  });


  socket.on('newLocationMessage' , function(message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);

    a.attr('href',message.url);

    li.append(a);

    jQuery('#messages').append(li);


  });

  var locationButton = jQuery('#send-location');

  var messageTextBox = jQuery('#message');

  locationButton.on('click' , function() {

    if(!navigator.geolocation)
    {
      return alert('Your browser does not support geolocation');
    }

      locationButton.attr('disabled','disabled')
      locationButton.text('Sending location...')

    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);
      locationButton.removeAttr('disabled');
      locationButton.text('Send Location')

      socket.emit('createLocationMessage', {
        longitude:position.coords.longitude,
        latitude:position.coords.latitude
      });

    },function() {
      locationButton.removeAttr('disabled');
      locationButton.text('Send Location')
      alert('Unable to fetch location');
    });

  });

  jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();


    socket.emit('createMessage',{
      from:'User',
      text:messageTextBox.val()
    }, function() {

    });

    messageTextBox.val('');
  });
