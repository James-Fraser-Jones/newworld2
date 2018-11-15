'use strict';

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 4200

//app.use(express.static(__dirname + '/node_modules'));
app.use('/content', express.static(__dirname + '/content'));

app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('join', function(data) {
    console.log(data);
    socket.emit('messages', 'Hello from server');
  });
});

server.listen(port, () => console.log(`Listening on port ${port}!`))
