import React, { Component } from 'react';
import TableData from '../Table/Table';

import logo from '../../logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>MERN CRUD Starter Kit</h2>
          </div>
        </div>
        <TableData />
      </div>
    );
  }
}

export default App;
