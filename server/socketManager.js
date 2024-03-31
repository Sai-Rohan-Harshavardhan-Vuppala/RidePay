const socketIo = require('socket.io');
const UserNotification = require('./models/userNotificationModel');

exports.initSocket = (server) => {
  const io = socketIo(server);
  const userSocketMap = {};

  io.on('connection', (socket) => {
    setupConnectionHandlers(socket, userSocketMap);
  });

  setupNotificationListener(io, userSocketMap);
};

function setupConnectionHandlers(socket, userSocketMap) {
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = userSocketMap[userId] || [];
    userSocketMap[userId].push(socket.id);
  }

  socket.on('connect_error', (error) => {
    console.error(`Error with client ${socket.id}:`, error);
  });

  console.log(`New client connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    if (userId) {
      userSocketMap[userId] = userSocketMap[userId].filter(id => id !== socket.id);
    }
    console.log(`Socket ${socket.id} disconnected`);
  });
}

function setupNotificationListener(io, userSocketMap) {
  const usernotificationChangeStream = UserNotification.watch();

  usernotificationChangeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      const { user, notif } = change.fullDocument;
      const socketIds = userSocketMap[user.toString()] || [];
      console.log(notif)
      socketIds.forEach((socketId) => {
        io.to(socketId).emit('notification', { notifId: notif });
      });
    }
  });
}
