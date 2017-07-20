import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';

import TableData from '../TableData/TableData';
import ModalAdd from '../ModalAdd/ModalAdd';

import logo from '../../logo.svg';
import './App.css';

class App extends Component {

  // Pass this as a prop
  server = 'http://localhost:3000'; // http://localhost:3000

  constructor() {
    super();

    this.state = {
      users: []
    }

    this.handleUsersListChange = this.handleUsersListChange.bind(this);
  }

  componentDidMount() {
    axios.get(`${this.server}/api/users/`)
    .then((response) => {
      this.setState({ users: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleUsersListChange(addedUser) {
    const users = this.state.users.slice();
    users.push(addedUser);
    this.setState({
      users: users
    });
  }

  render() {
    return (
      <div>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>MERN CRUD Starter Kit</h2>
            <p>A Create, Read, Update, and Delete starter kit using MongoDB, Express.js, React.js, and Node.js</p>
            <p>Semantic UI React was used for the UI.</p>
          </div>
        </div>
        <Container>
          <ModalAdd onUsersListChange={this.handleUsersListChange} server={this.server} />
          <TableData users={this.state.users} />
        </Container>
        <br/>
      </div>
    );
  }
}

export default App;
