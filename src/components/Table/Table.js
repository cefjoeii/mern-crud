import React from 'react';
import { Container } from 'semantic-ui-react';
import { Table } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

const ButtonAction = () => (
  <div>
    <Button>Edit</Button>
    <Button secondary>Delete</Button>
  </div>
)

const TableData = () => {
  return (
    <Container>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>John Lilki</Table.Cell>
            <Table.Cell>jhlilk22@gmail.com</Table.Cell>
            <Table.Cell>jhlilk22</Table.Cell>
            <Table.Cell>21</Table.Cell>
            <Table.Cell><ButtonAction /></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jamie Harington</Table.Cell>
            <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
            <Table.Cell>jamieharingonton</Table.Cell>
            <Table.Cell>25</Table.Cell>
            <Table.Cell><ButtonAction /></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jill Lewis</Table.Cell>
            <Table.Cell>jilsewris22@outlook.com</Table.Cell>
            <Table.Cell>jilsewris22</Table.Cell>
            <Table.Cell>12</Table.Cell>
            <Table.Cell><ButtonAction /></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
}

export default TableData;
