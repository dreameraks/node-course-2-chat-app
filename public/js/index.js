  var socket = io();

  socket.on('connect', function() {
    console.log("Connected to server");
  });

  socket.on('newMessage',function(message) {
    console.log("New message " ,message);

    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template , {
      text:message.text,
      from:message.from,
      formattedTime:formattedTime
    });

    jQuery('#messages').append(html);

  });

  socket.on('disconnect', function(){
    console.log("Disconnected from server");
  });


  socket.on('newLocationMessage' , function(message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#location-message-template').html();
    
    var html = Mustache.render(template, {
      url:message.url,
      from:message.from,
      formattedTime:formattedTime
    });

    jQuery('#messages').append(html);


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
