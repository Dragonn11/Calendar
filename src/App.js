import React, { Component } from 'react';
import Calendar from './Component/Calendar';
import './App.css';

const style = {
  position: "relative",
  margin: "50px auto"
}

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header"> */}
        <Calendar width="302px" style={style} />
         
        {/* </header> */}
      </div>
    );
  }
}

export default App;
