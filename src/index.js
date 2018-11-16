'use strict';

//==============================================================================
//websocket stuff

const socket = io('http://localhost:4200');

socket.on('connect', function(data) {
  console.log("connected to server");
});

socket.on('disconnect', function(data) {
  console.log("disconnected from server");
});

socket.on('json', function(data) {
  console.log("received JSON object:\n" + JSON.stringify(data));
});

function attach(cb){
  socket.on('json', function(data) {
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

function sendJSON(){
  socket.emit('json', testJSON);
}

//==============================================================================
//react stuff

class DBTable extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props;
    attach((data) => this.setState({data}));
  }

  render(){
    if (this.state.data){
      let headerNames = Object.keys(this.state.data[0]);
      let grid = this.state.data.map(x => Object.values(x));

      return(
        <table className="table border border-dark">
          <PureHead headerNames={headerNames}/>
          <PureBody grid={grid}/>
        </table>
      );
    }
    return(<div/>)
  }
}

function PureTable(props){
  let headerNames = Object.keys(props.grid[0]);
  let grid = props.grid.map(x => Object.values(x));

  return(
    <table className="table border border-dark">
      <PureHead headerNames={headerNames}/>
      <PureBody grid={grid}/>
    </table>
  );
}

function PureHead(props){
  return(
    <thead className="thead-dark">
      <PureRow row={props.headerNames} isHeader={true}/>
    </thead>
  );
}

function PureBody(props){
  //make rows
  let rows = [];
  for (let i = 0; i < props.grid.length; i++){
    rows.push(<PureRow key={i} row={props.grid[i]} isHeader={false}/>);
  }

  return(
    <tbody>{rows}</tbody>
  );
}

function PureRow(props){
  //make cells
  let cells = [];
  if (props.isHeader){
    for (let i = 0; i < props.row.length; i++){
      cells.push(<PureHeader key={i} headerName={props.row[i]}/>);
    }
  }
  else{
    cells.push(<PureCell key={0} editable={false} cellValue={props.row[0]}/>); //primary key cell
    for (let i = 1; i < props.row.length; i++){
      cells.push(<PureCell key={i} editable={true} cellValue={props.row[i]}/>);
    }
  }

  return(<tr>{cells}</tr>);
}

function PureHeader(props){
  return(<th scope="col">{props.headerName.toString()}</th>);
}

function PureCell(props){
  if (props.editable){
    return(<td contentEditable suppressContentEditableWarning>{props.cellValue.toString()}</td>);
  }
  return(<td>{props.cellValue.toString()}</td>);
}

function App(props){
  return(
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-4">
          <DBTable/>
        </div>
      </div>
    </div>
  );
}

//render the above app in the react entry point in the html file
var domContainer = document.querySelector('#newworld_entry');
ReactDOM.render(<App/>, domContainer);
