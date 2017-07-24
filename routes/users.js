const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const sanitizeName = require('string-capitalize-name');

const User = require('../models/user');

sanitizeAge = (age) => {
  // Return empty if age is non-numeric
  if (isNaN(age) && age != '') return '';

  return (age === '') ? age : parseInt(age);
}

// READ
router.get('/', (req, res) => {

  // If query string is provided, send that specific user
  if (req.query.id) {
    User.findById(req.query.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: 'No such user.' });
    });
    return; // Skip the remaining code below
  }

  // Send them all if no query string is provided
  User.find({})
  .then((result) => {
    res.json(result);
  });

});

// CREATE
router.post('/', (req, res) => {

  // Validate the age
  let age = sanitizeAge(req.body.age);
  if (age < 5 && age != '') return res.status(400).json({ success: false, msg: 'You\'re too young for this.'});
  else if (age > 130 && age != '') return res.status(400).json({ success: false, msg: 'You\'re too old for this.'});

  let newUser = new User({
    name: sanitizeName(req.body.name),
    email: req.body.email,
    age: sanitizeAge(req.body.age),
    gender: req.body.gender
  });

  newUser.save()

  .then((result) => {
    res.json({
      success: true,
      msg: 'Successfully added!',
      result: {
        _id: result._id,
        name: result.name,
        email: result.email,
        age: result.age,
        gender: result.gender
      }
    });
  })

  .catch((err) => {
    if (err.errors) {
      if (err.errors.name) {
        res.status(400).json({ success: false, msg: err.errors.name.message });
        return;
      }
      if (err.errors.email) {
        res.status(400).json({ success: false, msg: err.errors.email.message });
        return;
      }
      if (err.errors.age) {
        res.status(400).json({ success: false, msg: err.errors.age.message });
        return;
      }
      if (err.errors.gender) {
        res.status(400).json({ success: false, msg: err.errors.gender.message });
        return;
      }
      // Show failed if all else fails for some reasons
      res.status(400).json( { success: false, msg: 'Something went wrong. Failed to add.'});
    }
  });
});

// UPDATE
router.put('/:id', (req, res) => {

  // Validate the age
  let age = sanitizeAge(req.body.age);
  if (age < 5 && age != '') return res.status(400).json({ success: false, msg: 'You\'re too young for this.'});
  else if (age > 130 && age != '') return res.status(400).json({ success: false, msg: 'You\'re too old for this.'});

  let updatedUser = {
    name: sanitizeName(req.body.name),
    email: req.body.email,
    age: sanitizeAge(req.body.age),
    gender: req.body.gender
  };

  User.findOneAndUpdate({ _id: req.params.id }, updatedUser, { runValidators: true, context: 'query' })
  
  .then((beforeResult) => {

    User.findOne({ _id: req.params.id })

    .then((afterResult) => {
      res.json({
        success: true,
        msg: 'Successfully updated!',
        result: {
          _id: afterResult._id,
          name: afterResult.name,
          email: afterResult.email,
          age: afterResult.age,
          gender: afterResult.gender
        }
      });
    })

    .catch((err) => {
      res.status(400).json({ success: false, msg: 'Something went wrong. ' + err });
      return;
    });

  })
  
  .catch((err) => {
    if (err.errors) {
      if (err.errors.name) {
        res.status(400).json({ success: false, msg: err.errors.name.message });
        return;
      }
      if (err.errors.email) {
        res.status(400).json({ success: false, msg: err.errors.email.message });
        return;
      }
      if (err.errors.age) {
        res.status(400).json({ success: false, msg: err.errors.age.message });
        return;
      }
      if (err.errors.gender) {
        res.status(400).json({ success: false, msg: err.errors.gender.message });
        return;
      }
      // Show failed if all else fails for some reasons
      res.status(400).json({ success: false, msg: 'Something went wrong. ' + err});
    }
  });

});

// DELETE
router.delete('/:id', (req, res) => {

  User.findByIdAndRemove(req.params.id)
  .then((result) => {
    res.json({
      success: true,
      msg: 'It has been deleted.',
      result: {
        _id: result._id,
        name: result.name,
        email: result.email,
        age: result.age,
        gender: result.gender
      }
    });
  })
  .catch((err) => {
    res.status(400).json({ success: false, msg: 'Nothing to delete.'});
  });
});

module.exports = router;
