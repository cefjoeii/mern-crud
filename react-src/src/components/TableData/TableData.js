import React from 'react';
import { Button, Table } from 'semantic-ui-react';

const ButtonAction = () => (
  <div>
    <Button secondary>Edit</Button>
    <Button>Delete</Button>
  </div>
)

const TableData = () => {
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
        <Table.Row>
          <Table.Cell>John Lilki</Table.Cell>
          <Table.Cell>jhlilk22@gmail.com</Table.Cell>
          <Table.Cell>21</Table.Cell>
          <Table.Cell>M</Table.Cell>
          <Table.Cell><ButtonAction /></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jamie Harington</Table.Cell>
          <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
          <Table.Cell>25</Table.Cell>
          <Table.Cell>F</Table.Cell>
          <Table.Cell><ButtonAction /></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jill Lewis</Table.Cell>
          <Table.Cell>jilsewris22@outlook.com</Table.Cell>
          <Table.Cell>12</Table.Cell>
          <Table.Cell>F</Table.Cell>
          <Table.Cell><ButtonAction /></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

export default TableData;
