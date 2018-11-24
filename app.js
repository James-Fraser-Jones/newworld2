'use strict';

//==============================================================================
//Global variables

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const db = require('better-sqlite3')('content/database/chinook.db');
const port = 4200;

//var socket;
//const insert = db.prepare('UPDATE customers SET @fieldName = @value WHERE @tableId = @pkID');
//SELECT * FROM sqlite_master

//==============================================================================
//Static content delivery
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/content', express.static(__dirname + '/content'));

//==============================================================================
//Default page to serve to new clients, also turn on the server

app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/index2.html');
});

server.listen(port, () => console.log(`Listening on port ${port}!`))

//==============================================================================
//Websocket callbacks

io.on('connection', (socket) => {
  console.log('user connected');

  const tableData = db.prepare('SELECT CustomerID, FirstName AS Customer_FirstName, Address AS Customer_Address FROM Customer').all();
  socket.emit('initialize', tableData);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('toServer', recieveUpdate);
});

function recieveUpdate(dbObjs){
  if (dbObjs){
    // console.log("dbObjs = " + JSON.stringify(dbObjs));
    applyUpdate(dbObjs);
  }
}

function applyUpdate(dbObjs){
  let sql = dbObjs.map(dBToSQL).join(";") + ";";
  console.log("sql = " + JSON.stringify(sql));
  db.exec(sql);
}

//==============================================================================
//Helper functions

function dBToSQL(dbObj){
  return `UPDATE ${dbObj.tableName} SET ${dbObj.fieldName} = '${dbObj.value}' WHERE ${dbObj.tableName}ID = ${dbObj.pkID}`;
}
