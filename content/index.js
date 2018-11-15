'use strict';

var socket = null;

function handleClick(cb) {
  if (cb.checked){
    //connect and add callback functions
    socket = io.connect('http://localhost:4200');
    socket.on('connect', function(data) {
      socket.emit('join', 'Bellow World from client');
    });
    socket.on('messages', function(data) {
      alert(data);
    });
  }
  else{
    //disconnect
    socket.disconnect();
    socket = null;
  }
}
