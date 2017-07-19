const mongoose = require('mongoose');
const titlize = require('mongoose-title-case');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');
const config = require('../config/db');

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Name must not exceed {ARGS[1]} characters.'
  })
];

const emailValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Email must not exceed {ARGS[1]} characters.'
  }),
  validate({
    validator: 'isEmail',
    message: 'Email must be valid.'
  })
];

const ageValidator = [
  // validate({
  //   validator: 'isInt',
  //   arguments: [1, 120],
  //   message: 'Age must be valid.'
  // })
];

const genderValidator = [
  // TODO: Make some validators here...
];

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate: nameValidator
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
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

// Make the name capitalization consistent
UserSchema.plugin(titlize, { paths: ['name'], trim: false });

const User = module.exports = mongoose.model('user', UserSchema);
