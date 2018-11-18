'use strict';

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const db = require('better-sqlite3')('content/newworld.db');

const port = 4200;

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/content', express.static(__dirname + '/content'));

app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/index2.html');
});

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  const tableData = db.prepare('SELECT * FROM Item').all();
  socket.emit('json', tableData);

  socket.on('json', function(data) {
    console.log("received JSON object:\n" + JSON.stringify(data));
  });
});

server.listen(port, () => console.log(`Listening on port ${port}!`))
