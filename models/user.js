const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

const nombreValidador = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Nombre no debe exceder {ARGS[1]} caracteres.'
  })
];


// Define the database model
const UserSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Nombre es requerido.'],
    validate: nombreValidador
  },
  apellido: {
    type: String,
    required: [true, 'Apellido es requerido.'],
  },
  fecha: {
    type: Date,
    required: [true, 'Fecha es requerido.']
  },
  cedula:{
    type: String,
    required: [true, 'Cedula es obligatorio.'],
  },
  responsable: {
    type: String,
    required: [true, 'Responsable es requerido.'],
  },
  telefono: {
    type: String,
    required: [true, 'Telefono es requerido.'],
  },
  estado: {
    type: Boolean,
    default:true,
    required:[true, 'Estado es requerido.'],
},

});

// Use the unique validator plugin
UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const User = module.exports = mongoose.model('user', UserSchema);
