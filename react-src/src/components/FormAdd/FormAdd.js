import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'm' },
  { key: 'f', text: 'Female', value: 'f' },
]

class FormAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      age: '',
      gender: '',
      formClassName: '',
      formSuccessMessage: '',
      formErrorMessage: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSelectChange(e, data) {
    this.setState({ gender: data.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      age: parseInt(this.state.age, 10),
      gender: this.state.gender
    }

    axios({
      method: 'post',
      responseType: 'json',
      url: `${this.props.server}/api/users/`,
      data: newUser
    })
    .then((response) => {
      this.setState({
        name: '',
        email: '',
        age: '',
        gender: '',
        formClassName: 'success',
        formSuccessMessage: response.data.msg
      });
      this.props.onUsersListChange(response.data.addedUser);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.data) {
          this.setState({
            formClassName: 'warning',
            formErrorMessage: err.response.data.msg
          });
        }
      }
      else {
        this.setState({
          formClassName: 'warning',
          formErrorMessage: 'Something went wrong.'
        });
      }
    });
  }

  render() {

    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;

    return (
      <Form className={formClassName} onSubmit={this.handleSubmit}>
        <Form.Input
          label='Name'
          type='text'
          placeholder='Elon Musk'
          name='name'
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='Email'
          type='text'
          placeholder='elonmusk@tesla.com'
          name='email'
          value={this.state.email}
          onChange={this.handleInputChange}
        />
        <Form.Group widths='equal'>
          <Form.Input
            label='Age'
            type='number'
            placeholder='18'
            min={0}
            max={120}
            name='age'
            value={this.state.age}
            onChange={this.handleInputChange}
          />
          <Form.Field
            control={Select}
            label='Gender'
            options={genderOptions}
            placeholder='Gender'
            value={this.state.gender}
            onChange={this.handleSelectChange}
          />
        </Form.Group>
        <Message
          success
          color='green'
          header='Nice one!'
          content={formSuccessMessage}
        />
        <Message
          warning
          color='yellow'
          header='Woah!'
          content={formErrorMessage}
        />
        <Button color='green' floated='right'>Add</Button>
        <br /><br /> {/* Yikes! */}
      </Form>
    );
  }
}

export default FormAdd;
