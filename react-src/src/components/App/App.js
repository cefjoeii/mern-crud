import React, { useEffect, Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import io from 'socket.io-client';

import TableUser from '../TableUser/TableUser';
import ModalUser from '../ModalUser/ModalUser';

import logo from '../../mern-logo.png';
import shirts from '../../shirts.png';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.server = process.env.REACT_APP_API_URL || '';
    this.socket = io.connect(this.server);

    this.state = {
      users: [],
      online: 0
    }

    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleUserAdded = this.handleUserAdded.bind(this);
    this.handleUserUpdated = this.handleUserUpdated.bind(this);
    this.handleUserDeleted = this.handleUserDeleted.bind(this);
  }

  // Place socket.io code inside here
  componentDidMount() {
    this.fetchUsers();
    this.socket.on('visitor enters', data => this.setState({ online: data }));
    this.socket.on('visitor exits', data => this.setState({ online: data }));
    this.socket.on('add', data => this.handleUserAdded(data));
    this.socket.on('update', data => this.handleUserUpdated(data));
    this.socket.on('delete', data => this.handleUserDeleted(data));
  }

  // Fetch data from the back-end
  fetchUsers() {
    axios.get(`${this.server}/api/users/`)
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleUserAdded(user) {
    let users = this.state.users.slice();
    users.push(user);
    this.setState({ users: users });
  }

  handleUserUpdated(user) {
    let users = this.state.users.slice();
    
    let i = users.findIndex(u => u._id === user._id)

    if (users.length > i) { users[i] = user }

    this.setState({ users: users });
  }

  handleUserDeleted(user) {
    let users = this.state.users.slice();
    users = users.filter(u => { return u._id !== user._id; });
    this.setState({ users: users });
  }

  render() {
    let online = this.state.online;
    let onlineText = ""
    
    if (online < 2) {
      onlineText = 'No one else is online';
    } else if (online - 1 < 2) {
      onlineText = `${online - 1} person is online`;
    } else {
      onlineText = `${online - 1} people are online`;
    }

    return (
      <div>
        <div className='App'>
          <div className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-intro'>MERN CRUD</h1>
            <p>
              A simple records system using MongoDB, Express.js, React.js, and Node.js. REST API was implemented on the back-end.
              <br/>
              CREATE, READ, UPDATE, and DELETE operations are updated in real-time to online users using Socket.io.
            </p>
            <a className='shirts' href='https://www.teepublic.com/en-au/user/codeweario/albums/4812-tech-stacks' target='_blank' rel='noopener noreferrer'>
              <img src={shirts} alt='Buy MERN Shirts' />
              <br/>Buy MERN Shirts
            </a>
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
            socket={this.socket}
          />
          <em id='online'>{onlineText}</em>
          <TableUser
            onUserUpdated={this.handleUserUpdated}
            onUserDeleted={this.handleUserDeleted}
            users={this.state.users}
            server={this.server}
            socket={this.socket}
          />
        </Container>
        <br />
      </div>
    );
  }
}

export default App;
