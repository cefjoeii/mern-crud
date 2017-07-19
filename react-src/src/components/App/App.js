import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import TableData from '../TableData/TableData';
import ModalAdd from '../ModalAdd/ModalAdd';

import logo from '../../logo.svg';
import './App.css';

class App extends Component {

  // Pass this as a property
  server = 'http://localhost:3000'; // http://localhost:3000

  render() {
    return (
      <div>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>MERN CRUD Starter Kit</h2>
          </div>
        </div>
        <Container>
          <ModalAdd server={this.server} />
          <TableData />
        </Container>
      </div>
    );
  }
}

export default App;
