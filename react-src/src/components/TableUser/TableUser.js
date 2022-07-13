import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import ModalUser from '../ModalUser/ModalUser';
import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete';

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
            headerTitle='Editar Usuario'
            buttonTriggerTitle='Editar'
            buttonSubmitTitle='Guardar'
            buttonColor='gray'
            userID={user._id}
            onUserUpdated={this.props.onUserUpdated}
            server={this.props.server}
            socket={this.props.socket}
          />
          <ModalConfirmDelete
            headerTitle='Elimiar Usuario'
            buttonTriggerTitle='Eliminar'
            buttonColor='white'
            user={user}
            onUserDeleted={this.props.onUserDeleted}
            server={this.props.server}
            socket={this.props.socket}
          />
        </Table.Cell>
      </Table.Row>
    );

    // Make every new user appear on top of the list
    users =  [...users].reverse();

    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Correo</Table.HeaderCell>
            <Table.HeaderCell>Edad</Table.HeaderCell>
            <Table.HeaderCell>Genero</Table.HeaderCell>
            <Table.HeaderCell>Acciones</Table.HeaderCell>
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
