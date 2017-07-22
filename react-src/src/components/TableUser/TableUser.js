import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';

import ModalUser from '../ModalUser/ModalUser';

class TableUser extends Component {

  render() {

    let users = this.props.users;

    users = users.map((user) => 
      <Table.Row key={user._id}>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>{user.age}</Table.Cell>
        <Table.Cell>{user.gender}</Table.Cell>
        <Table.Cell>
          <ModalUser
            headerTitle='Edit User'
            buttonTriggerTitle='Edit'
            buttonSubmitTitle='Save'
            buttonColor='blue'
            userID={user._id}
            onUserUpdated={this.props.onUserUpdated}
            server={this.props.server}
          />
          <Button color='black'>Delete</Button>
        </Table.Cell>
      </Table.Row>
    );

    users =  [...users].reverse();

    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users}
        </Table.Body>
      </Table>
    );
  }
}

export default TableUser;
