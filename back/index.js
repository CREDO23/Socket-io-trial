const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const { info } = require("console");

const app = express();
const server = createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const sessions = {};

io.on("connection", (socket) => {
  sessions[socket.handshake.auth.id] = socket.id;
  console.log(sessions);
  console.log(io.engine.clientsCount);

  socket.on('join room' , (room) => {
    socket.join(room)

    console.log(io.sockets.adapter.rooms)
  })

  socket.on("message", (message, chanel) => {
    console.log(message, chanel);
    socket.to(chanel).emit("new message", message , socket.handshake.auth.id);
  });

  socket.on('private message' , (message , to) => {
    console.log(message , to)
    socket.to(sessions[to]).emit("new message", message , socket.handshake.auth.id)
  })

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});

server.listen(7000, () => {
  console.log("Server on 7000");
});
