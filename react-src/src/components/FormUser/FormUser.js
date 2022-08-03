import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';

const estadoOptions = [
  { key: true, text: 'Pagado', value: true },
  { key: false, text: 'No pagado', value: false },
]

class FormUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nombre: '',
      apellido: '',
      fecha: '',
      cedula: '',
      responsable: '',
      telefono: '',
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
      console.log(this.props.userID)
      console.log(this.props.server)
      axios.get(`${this.props.server}/api/users/${this.props.userID}`)
        .then((response) => {
          this.setState({
            nombre: response.data.nombre,
            apellido: response.data.apellido,
            fecha: response.data.fecha,
            cedula: response.data.cedula,
            responsable: response.data.responsable,
            telefono: response.data.telefono,
            estado: response.data.estado
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
    this.setState({ estado: data.value });
  }

  handleSubmit(e) {
    // Prevent browser refresh
    e.preventDefault();

    const user = {
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      fecha: this.state.fecha,
      cedula: this.state.cedula,
      responsable: this.state.responsable,
      telefono: this.state.telefono,
      estado: this.state.estado
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
            nombre: '',
            apellido: '',
            fecha: '',
            cedula: '',
            responsable: '',
            telefono: '',
            estado: ''
          });
          this.props.onUserAdded(response.data.result);
        }
        else {
          this.props.onUserUpdated(response.data.result);
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
            formErrorMessage: 'Algo salio mal. ' + err
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
        <Form.Group widths='equal'>
          <Form.Input
            label='Nombre'
            type='text'
            placeholder='Pepito'
            name='nombre'
            maxLength='40'
            required
            value={this.state.nombre}
            onChange={this.handleInputChange}
          />
          <Form.Input
            label='Apellido'
            type='text'
            placeholder='Perez'
            name='apellido'
            maxLength='40'
            required
            value={this.state.apellido}
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Form.Input
          label='Fecha de Defuncion'
          name='fecha'
          type='date'
          maxLength='10'
          required
          pattern="\d{4}-\d{2}-\d{2}"
          value={this.state.fecha.split("T")[0]}
          onChange={this.handleInputChange}
        />
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
          label='Responsable'
          type='text'
          placeholder='Nombres y Apellidos'
          min={5}
          max={130}
          name='responsable'
          value={this.state.responsable}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='Telefono'
          type='text'
          placeholder='Telefono'
          min={3}
          max={20}
          name='telefono'
          value={this.state.telefono}
          onChange={this.handleInputChange}
        />
        <Form.Field
          control={Select}
          label='Estado'
          options={estadoOptions}
          placeholder=''
          value={this.state.estado}
          onChange={this.handleSelectChange}
        />
        <Message
          success
          color='red'
          header='Mensaje:'
          content={formSuccessMessage}
        />
        <Message
          warning
          color='yellow'
          header='Advertenciasss!'
          content={formErrorMessage}
        />
        <Button color={this.props.buttonColor} floated='right'>{this.props.buttonSubmitTitle}</Button>
        <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
      </Form>
    );
  }
}

export default FormUser;
