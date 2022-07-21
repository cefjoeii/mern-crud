import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';

const genderOptions = [
  { key: 'M', text: 'Masculino', value: 'M' },
  { key: 'F', text: 'Femenino', value: 'F' },
]

class FormUser extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      cedula: '',
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

  componentWillMount() {
    // Fill in the form with the appropriate data if user id is provided
    if (this.props.userID) {
      axios.get(`${this.props.server}/api/users/${this.props.userID}`)
      .then((response) => {
        this.setState({
          cedula: response.data.cedula,
          name: response.data.name,
          email: response.data.email,
          age: response.data.age ?? '',
          gender: response.data.gender,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
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
    // Prevent browser refresh
    e.preventDefault();

    const user = {
      cedula: this.state.cedula,
      name: this.state.name,
      email: this.state.email,
      age: this.state.age,
      gender: this.state.gender
    }

    // Acknowledge that if the user id is provided, we're updating via PUT
    // Otherwise, we're creating a new data via POST
    const method = this.props.userID ? 'put' : 'post';
    const params = this.props.userID ? this.props.userID : '';

    axios({
      method: method,
      responseType: 'json',
      url: `${this.props.server}/api/users/${params}`,
      data: user
    })
    .then((response) => {
      this.setState({
        formClassName: 'success',
        formSuccessMessage: response.data.msg
      });

      if (!this.props.userID) {
        this.setState({
          cedula: '',
          name: '',
          email: '',
          age: '',
          gender: ''
        });
        this.props.onUserAdded(response.data.result);
        this.props.socket.emit('add', response.data.result);
      }
      else {
        this.props.onUserUpdated(response.data.result);
        this.props.socket.emit('update', response.data.result);
      }
      
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
          formErrorMessage: 'Something went wrong. ' + err
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
          label='Cedula'
          type='text'
          placeholder='0104751987'
          name='cedula'
          maxLength='10'
          required
          value={this.state.cedula}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='Nombre'
          type='text'
          placeholder='Pepito Perez'
          name='name'
          maxLength='40'
          required
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='Correo'
          type='email'
          placeholder='pepito@sayausi.com'
          name='email'
          maxLength='40'
          required
          value={this.state.email}
          onChange={this.handleInputChange}
        />
        <Form.Group widths='equal'>
          <Form.Input
            label='Edad'
            type='number'
            placeholder='18'
            min={5}
            max={130}
            name='age'
            value={this.state.age}
            onChange={this.handleInputChange}
          />
          <Form.Field
            control={Select}
            label='Genero'
            options={genderOptions}
            placeholder='Genero'
            value={this.state.gender}
            onChange={this.handleSelectChange}
          />
        </Form.Group>
        <Message
          success
          color='red'
          header='Mensaje:'
          content={formSuccessMessage}
    /> 
        <Message
          warning
          color='yellow'
          header='Advertencia!'
          content={formErrorMessage}
        />
        <Button color={this.props.buttonColor} floated='right'>{this.props.buttonSubmitTitle}</Button>
        <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
      </Form>
    );
  }
}

export default FormUser;
