'use strict';

//==============================================================================
//websocket stuff

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var socket = io('http://localhost:4200');

socket.on('connect', function (data) {
  console.log("connected to server");
});

socket.on('disconnect', function (data) {
  console.log("disconnected from server");
});

socket.on('json', function (data) {
  console.log("received object:\n" + JSON.stringify(data));
});

function attach(cb) {
  socket.on('json', function (data) {
    cb(data);
  });
}

// function toggleConnection() {
//   if (chkConnect.checked){
//     socket.open();
//   }
//   else{
//     socket.close();
//   }
// }

function sendJSON() {
  socket.emit('json', testJSON);
}

//==============================================================================
//react stuff

var DBTable = function (_React$Component) {
  _inherits(DBTable, _React$Component);

  function DBTable(props) {
    _classCallCheck(this, DBTable);

    var _this = _possibleConstructorReturn(this, (DBTable.__proto__ || Object.getPrototypeOf(DBTable)).call(this, props));

    _this.state = _this.props;
    attach(function (data) {
      return _this.setState({ data: data });
    });
    return _this;
  }

  _createClass(DBTable, [{
    key: 'render',
    value: function render() {
      if (this.state.data) {
        var headerNames = Object.keys(this.state.data[0]);
        var grid = this.state.data.map(function (x) {
          return Object.values(x);
        });

        return React.createElement(
          'table',
          { className: 'table border border-dark' },
          React.createElement(PureHead, { headerNames: headerNames }),
          React.createElement(PureBody, { grid: grid })
        );
      }
      return React.createElement('div', null);
    }
  }]);

  return DBTable;
}(React.Component);

function PureTable(props) {
  var headerNames = Object.keys(props.grid[0]);
  var grid = props.grid.map(function (x) {
    return Object.values(x);
  });

  return React.createElement(
    'table',
    { className: 'table border border-dark' },
    React.createElement(PureHead, { headerNames: headerNames }),
    React.createElement(PureBody, { grid: grid })
  );
}

function PureHead(props) {
  return React.createElement(
    'thead',
    { className: 'thead-dark' },
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
    'tbody',
    null,
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
    'tr',
    null,
    cells
  );
}

function PureHeader(props) {
  return React.createElement(
    'th',
    { scope: 'col' },
    props.headerName.toString()
  );
}

function PureCell(props) {
  return React.createElement(
    'td',
    { contentEditable: true, suppressContentEditableWarning: true },
    props.cellValue.toString()
  );
}

function App(props) {
  return React.createElement(
    'div',
    { className: 'container-fluid mt-5' },
    React.createElement(
      'div',
      { className: 'row justify-content-center' },
      React.createElement(
        'div',
        { className: 'col-4' },
        React.createElement(DBTable, null)
      )
    )
  );
}

//render the above app in the react entry point in the html file
var domContainer = document.querySelector('#newworld_entry');
ReactDOM.render(React.createElement(App, null), domContainer);