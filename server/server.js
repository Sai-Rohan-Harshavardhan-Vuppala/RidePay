const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");
const UserNotification = require("./models/userNotificationModel");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
).replace("<username>", process.env.DATABASE_USER);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIo(server);

const userSocketMap = {};

io.on("connection", (socket) => {
  var userId = socket.handshake.query.userId;
  if (userId) {
    if (!userSocketMap[userId]) {
      userSocketMap[userId] = [];
    }
    userSocketMap[userId].push(socket.id);
  }
  socket.on("connect_error", (error) => {
    console.error(`Error with client ${socket.id}:`, error);
  });

  console.log(`New client connected: ${socket.id}`);
  socket.on("disconnect", () => {
    // Remove the mapping on disconnect
    if (userId) {
      userSocketMap[userId] = userSocketMap[userId].filter(item => item !== socket.id);
    }
  });
});

const usernotificationChangeStream = UserNotification.watch();

usernotificationChangeStream.on("change", (change) => {
  if (change.operationType === "insert") {
    const userNotification = change.fullDocument;
    console.log(userNotification);
    console.log(userNotification.user.toString());
    const socketIds = userSocketMap[userNotification.user.toString()];
    for(var i=0; i < socketIds.length; i++)
    {
      io.to(socketIds[i]).emit("notification", { message: "byala" });
    }
  }
});

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => console.log("💥 Process terminated!"));
});
