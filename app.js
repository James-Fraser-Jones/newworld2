'use strict';

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const db = require('better-sqlite3')('content/newworld.db');

const port = 4200

const exampleObject = [{pk: 1, name:"James", age:23, grapes:true},
                       {pk: 2, name:"Nathan", age:24, grapes:false},
                       {pk: 4, name:"Edie", age:22, grapes:true}];

const testJSON = [{name:"James",age:23,likesCherries:true},{name:"Barney",age:50,likesCherries:false}];

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

  const tableData = db.prepare('SELECT * FROM Item').all();

  console.log("tableData: \n\n" + JSON.stringify(tableData));

  socket.emit('json', tableData);

  // socket.on('json', function(data) {
  //   console.log("received JSON object:\n" + JSON.stringify(data));
  //   socket.emit('json', data);
  // });
});

server.listen(port, () => console.log(`Listening on port ${port}!`))
