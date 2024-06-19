const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.get("/", (req, res) => {
  res.send("App is Working");
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://ahamadravkuda.netlify.app', // Replace with your Netlify domain
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("chat", (chat) => {
    io.emit("chat", chat);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

server.listen(5000, "0.0.0.0", () => {
  console.log("running on PORT 5000");
});
