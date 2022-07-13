const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Nombre no debe exceder {ARGS[1]} caracteres.'
  })
];

const emailValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Correo no debe exceder {ARGS[1]} caracteres.'
  }),
  validate({
    validator: 'isEmail',
    message: 'Correo debe ser valido.'
  })
];

const ageValidator = [
  // TODO: Make some validations here...
];

const genderValidator = [
  // TODO: Make some validations here...
];

// Define the database model
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nombre es requerido.'],
    validate: nameValidator
  },
  email: {
    type: String,
    required: [true, 'Correo es requerido.'],
    unique: true,
    validate: emailValidator
  },
  age: {
    type: Number,
    validate: ageValidator
  },
  gender: {
    type: String,
    validate: genderValidator
  }
});

// Use the unique validator plugin
UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const User = module.exports = mongoose.model('user', UserSchema);
