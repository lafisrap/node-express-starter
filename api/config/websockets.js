let clientsConnected = 0;

module.exports = (server) => {
  io = require('socket.io')(server);
  io.on('connection', client => {
    client.on('addStock', (data) => io.emit('addStock', data));
    client.on('removeStock', (data) => io.emit('removeStock', data));
    client.on('disconnect', () => {
      clientsConnected--;
      io.emit('clientsConnected', clientsConnected);
      console.log(`Client disconnected. ${clientsConnected} left.`);
    });

    clientsConnected++;
    io.emit('clientsConnected', clientsConnected);
    console.log(`Client connected. Now ${clientsConnected} clients.`);
  });

  console.log(io? 'Websockets Server running.' : 'Websockets server not running!');

  return io;  
}
