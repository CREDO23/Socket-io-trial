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

  socket.on("message", (message, to) => {
    console.log(message, sessions[to]);
    socket.to(sessions[to]).emit("new message", message);
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});

server.listen(7000, () => {
  console.log("Server on 7000");
});
