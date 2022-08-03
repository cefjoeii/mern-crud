import React, { Component } from 'react';
import { Table, Icon  } from 'semantic-ui-react';

import ModalUser from '../ModalUser/ModalUser';
import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete';

class TableUser extends Component {

  render() {

    let users = this.props.users;
    users = users.map((user) =>
        <Table.Row key={user._id} >
          <Table.Cell textAlign='center'>
            <Icon color={user.estado ? 'green' : 'red'  } name={user.estado ? 'checkmark box' : 'cancel'  }  size='large' />
          </Table.Cell>
        <Table.Cell>{user.nombre}</Table.Cell>
        <Table.Cell>{user.apellido}</Table.Cell>
        <Table.Cell>{user.fecha.split("T")[0]}</Table.Cell>
        <Table.Cell>{user.cedula}</Table.Cell>
        <Table.Cell>{user.responsable}</Table.Cell>
        <Table.Cell>{user.telefono}</Table.Cell>
        <Table.Cell textAlign='center'>
          <ModalUser
            headerTitle='Editar'
            buttonTriggerTitle=''
            buttonSubmitTitle='Guardar'
            buttonColor='white'
            userID={user._id}
            onUserUpdated={this.props.onUserUpdated}
            server={this.props.server}
          />
          <ModalConfirmDelete
            headerTitle='Eliminar'
            buttonTriggerTitle=''
            buttonColor='white'
            user={user}
            onUserDeleted={this.props.onUserDeleted}
            server={this.props.server}
          />
        </Table.Cell>
      </Table.Row>
    );

    // Make every new user appear on top of the list
    users = [...users].reverse();

    return (
      <Table unstackable celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell>Nombres</Table.HeaderCell>
            <Table.HeaderCell>Apellidos</Table.HeaderCell>
            <Table.HeaderCell>Fecha de Defuncion</Table.HeaderCell>
            <Table.HeaderCell>Cedula</Table.HeaderCell>
            <Table.HeaderCell>Responsable</Table.HeaderCell>
            <Table.HeaderCell>Telefono</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Acciones</Table.HeaderCell>
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
