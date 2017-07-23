import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';

import TableUser from '../TableUser/TableUser';
import ModalUser from '../ModalUser/ModalUser';

import logo from '../../logo.svg';
import './App.css';

class App extends Component {

  // Change this when deploying.
  server = 'http://localhost:3000';

  constructor() {
    super();

    this.state = { users: [] }

    this.handleUserAdded = this.handleUserAdded.bind(this);
    this.handleUserUpdated = this.handleUserUpdated.bind(this);
    this.handleUserDeleted = this.handleUserDeleted.bind(this);
  }

  // Fetch data from the back-end
  componentDidMount() {
    axios.get(`${this.server}/api/users/`)
    .then((response) => {
      this.setState({ users: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleUserAdded(user) {
    let users = this.state.users.slice();
    users.push(user);
    this.setState({ users: users });
  }

  handleUserUpdated(user) {
    let users = this.state.users.slice();
    for (let i = 0, n = users.length; i < n; i++) {
      if (users[i]._id === user._id) {
        users[i].name = user.name;
        users[i].email = user.email;
        users[i].age = user.age;
        users[i].gender = user.gender;
        break; //Stop this loop, we found it!
      }
    }
    this.setState({ users: users });
  }

  handleUserDeleted(user) {
    let users = this.state.users.slice();
    users = users.filter(function(u) { return u._id !== user._id; });
    this.setState({ users: users });
  }

  render() {
    return (
      <div>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>MERN CRUD Starter Kit</h1>
            <p>A Create, Read, Update, and Delete starter kit using MongoDB, Express.js, React.js, and Node.js</p>
            <p>REST API was implemented on the back-end. Semantic UI React was used for the UI.</p>
            <p><a className="social-link" href="https://github.com/cefjoeii" target="_blank" rel="noopener noreferrer">GitHub</a> &bull; <a className="social-link" href="https://linkedin.com/in/cefjoeii" target="_blank" rel="noopener noreferrer">LinkedIn</a> &bull; <a className="social-link" href="https://twitter.com/cefjoeii" target="_blank" rel="noopener noreferrer">Twitter</a></p>
          </div>
        </div>
        <Container>
          <ModalUser
            headerTitle='Add User'
            buttonTriggerTitle='Add New'
            buttonSubmitTitle='Add'
            buttonColor='green'
            onUserAdded={this.handleUserAdded}
            server={this.server}
          />
          <TableUser
            onUserUpdated={this.handleUserUpdated}
            onUserDeleted={this.handleUserDeleted}
            users={this.state.users}
            server={this.server}
          />
        </Container>
        <br/>
      </div>
    );
  }
}

export default App;
