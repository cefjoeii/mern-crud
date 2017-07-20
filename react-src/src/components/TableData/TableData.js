import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';

const ButtonAction = () => (
  <div>
    <Button color='blue'>Edit</Button>
    <Button color='black'>Delete</Button>
  </div>
)

class TableData extends Component {

  render() {
    const users = this.props.users;

    let user = users.map((user) =>
      <Table.Row key={user._id}>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>{user.age}</Table.Cell>
        <Table.Cell>{user.gender}</Table.Cell>
        <Table.Cell><ButtonAction /></Table.Cell>
      </Table.Row>
    );

    user =  [...user].reverse();

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
          {user}
        </Table.Body>
      </Table>
    );
  }
}

export default TableData;
