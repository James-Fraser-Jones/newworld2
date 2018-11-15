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
  console.log('user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('msg', function(data) {
    console.log("received message: " + data);
    socket.emit('msg', "server acknowledges following message: " + data);
  });
  socket.on('json', function(data) {
    console.log("received JSON object:\n" + JSON.stringify(data));
    socket.emit('json', data);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}!`))
