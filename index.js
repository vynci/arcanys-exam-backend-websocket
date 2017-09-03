var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection', function(client){

  client.on('new-user', function(data){
    console.log(data);
    io.emit('message/' + data.email, {sender:'Support', type:'new-message', text: 'Hi ' + data.name + '. How may I help you?'});
    io.emit('message/support', {sender: {name: data.name, email: data.email}, type:'new-user', text: 'New User Log-in'});
  });

  client.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  client.on('add-message', (message) => {
    io.emit('message/' + message.recipient, message);    
  });
  
});

server.listen(3001);