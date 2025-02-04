// External Import
const socket = require("socket.io");

const mySocket = (server) => {
  const io = socket(server, {
    cors: { origin: "*" },
  });
  let users = {};

  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("user connected", (userId) => {
      console.log("userId", userId);
      if (users[userId]) {
        users[userId] = [...users[userId], socket.id];
      }
      users[userId] = [socket.id];
      io.emit("user data", users);

      socket.on("disconnect", () => {
        delete users[userId];
        io.emit("user data", users);
      });
    });
  });

  return { users, io };
};

module.exports = mySocket;
