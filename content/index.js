'use strict';

const chkConnect = document.getElementById('chkConnect');
const txtSend = document.getElementById('txtSend');
const btnSend = document.getElementById('btnSend');
const btnSendJSON = document.getElementById('btnSendJSON');

const testJSON = [{name:"James",age:23,likesCherries:true},{name:"Barney",age:50,likesCherries:false}];

//==============================================================================

const socket = io('http://localhost:4200');

socket.on('connect', function(data) {
  console.log("connected to server");
  txtSend.removeAttribute("disabled", "");
  btnSend.removeAttribute("disabled", "");
  btnSendJSON.removeAttribute("disabled", "");
});

socket.on('disconnect', function(data) {
  console.log("disconnected from server");
  txtSend.setAttribute("disabled", "");
  btnSend.setAttribute("disabled", "");
  btnSendJSON.setAttribute("disabled", "");
});

socket.on('msg', function(data) {
  console.log("received message: " + data);
});

socket.on('json', function(data) {
  console.log("received object:\n" + JSON.stringify(data));
});

function toggleConnection() {
  if (chkConnect.checked){
    socket.open();
  }
  else{
    socket.close();
  }
}

function sendMessage(){
  if (txtSend.value) {
    socket.emit('msg', txtSend.value);
  }
}

function sendJSON(){
  socket.emit('json', testJSON);
}
