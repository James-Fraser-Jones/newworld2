'use strict';

//==============================================================================
//normal js stuff

var chkConnect = document.getElementById('chkConnect');
var txtSend = document.getElementById('txtSend');
var btnSend = document.getElementById('btnSend');
var btnSendJSON = document.getElementById('btnSendJSON');

var testJSON = [{ name: "James", age: 23, likesCherries: true }, { name: "Barney", age: 50, likesCherries: false }];

//==============================================================================
//websocket stuff

var socket = io('http://localhost:4200');

socket.on('connect', function (data) {
  console.log("connected to server");
  txtSend.removeAttribute("disabled", "");
  btnSend.removeAttribute("disabled", "");
  btnSendJSON.removeAttribute("disabled", "");
});

socket.on('disconnect', function (data) {
  console.log("disconnected from server");
  txtSend.setAttribute("disabled", "");
  btnSend.setAttribute("disabled", "");
  btnSendJSON.setAttribute("disabled", "");
});

socket.on('msg', function (data) {
  console.log("received message: " + data);
});

socket.on('json', function (data) {
  console.log("received object:\n" + JSON.stringify(data));
});

function toggleConnection() {
  if (chkConnect.checked) {
    socket.open();
  } else {
    socket.close();
  }
}

function sendMessage() {
  if (txtSend.value) {
    socket.emit('msg', txtSend.value);
  }
  txtSend.value = '';
}

function sendJSON() {
  socket.emit('json', testJSON);
}

//==============================================================================
//react stuff

var exampleObject = [{ pk: 1, name: "James", age: 23, grapes: true }, { pk: 2, name: "Nathan", age: 24, grapes: false }, { pk: 4, name: "Edie", age: 22, grapes: true }];

function PureTable(props) {
  var headerNames = Object.keys(props.grid[0]);
  var grid = props.grid.map(function (x) {
    return Object.values(x);
  });

  return React.createElement(
    'div',
    { className: 'divTable minimalistBlack' },
    React.createElement(PureHead, { headerNames: headerNames }),
    React.createElement(PureBody, { grid: grid })
  );
}

function PureHead(props) {
  return React.createElement(
    'div',
    { className: 'divTableHeading' },
    React.createElement(PureRow, { row: props.headerNames, isHeader: true })
  );
}

function PureBody(props) {
  //make rows
  var rows = [];
  for (var i = 0; i < props.grid.length; i++) {
    rows.push(React.createElement(PureRow, { key: i, row: props.grid[i], isHeader: false }));
  }

  return React.createElement(
    'div',
    { className: 'divTableBody' },
    rows
  );
}

function PureRow(props) {
  //make cells
  var cells = [];
  for (var i = 0; i < props.row.length; i++) {
    if (props.isHeader) {
      cells.push(React.createElement(PureHeader, { key: i, headerName: props.row[i] }));
    } else {
      cells.push(React.createElement(PureCell, { key: i, cellValue: props.row[i] }));
    }
  }

  return React.createElement(
    'div',
    { className: 'divTableRow' },
    cells
  );
}

function PureHeader(props) {
  return React.createElement(
    'div',
    { className: 'divTableHead' },
    props.headerName.toString()
  );
}

function PureCell(props) {
  return React.createElement(
    'div',
    { className: 'divTableCell', contentEditable: true, suppressContentEditableWarning: true },
    props.cellValue.toString()
  );
}

//render the above app in the react entry point in the html file
var domContainer = document.querySelector('#newworld_entry');
ReactDOM.render(React.createElement(PureTable, { grid: exampleObject }), domContainer);