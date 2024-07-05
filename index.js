const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const usersOnline = {}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  // console.log('user connected');
  socket.on('disconnect', () => {
    io.emit('chat message', `${usersOnline[socket.id]} saiu!`);
  });
  socket.on('login_name', (msg) => {
    usersOnline[socket.id] = msg;
    io.emit('chat message', `${msg} entrou!`);
    
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', `${usersOnline[socket.id]}: ${msg}`);
  });


});

server.listen(3000, () => {
  console.log('listening on *:3000');
});