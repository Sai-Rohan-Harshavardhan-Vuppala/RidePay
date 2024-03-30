const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Emit a notification every 5 seconds
  const interval = setInterval(() => {
    socket.emit('notification', { message: 'Hello! This is a notification.' });
  }, 5000);

  socket.on('disconnect', () => {
    console.log('User disconnected');
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
