const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

// Faked message ID to use as array key on frontend.
// Normally this would be an ID from a database.
let msgId = -1;

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('username', (msg) => {
    if (msg.currentUser.length > 0) {
      console.log(`the users name is ${msg.currentUser}`);
    }
  });
  socket.on('chat message', (msg) => {
    msgId += 1;
    const returnMsg = { ...msg, msgId };
    console.log('message:', returnMsg);
    io.emit('chat message', returnMsg);
  });
});

const port = 4000;

server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
