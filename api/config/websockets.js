
module.exports = (server) => {
  io = require('socket.io')(server);
  io.on('connection', client => {
    client.on('add-quote', (data) => io.emit('added_quote', data));
    client.on('remove-quote', (data) => io.emit('removed_quote', data));
    client.on('disconnect', () => {
      console.log("Client disconnected.");
    });

    console.log('Client connected.');
  });

  console.log(io? 'Websockets Server running.' : 'Websockets server not running!');

  return io;  
}
