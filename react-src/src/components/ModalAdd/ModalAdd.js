import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

import FormAdd from '../FormAdd/FormAdd';

class ModalFormAdd extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      open: false
    };
  }

  show = (size) => () => this.setState({ size, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, size } = this.state;

    return (
      <div>
        <Button onClick={this.show('tiny')} positive>Add New</Button>

        <Modal size={size} open={open} onClose={this.close} closeIcon='close'>
          <Modal.Header>
            Add User
          </Modal.Header>
          <Modal.Content>
            <FormAdd onUsersListChange={this.props.onUsersListChange} server={this.props.server} />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default ModalFormAdd;
