const express = require('express');
const router = express.Router();
const RateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const stringCapitalizeName = require('string-capitalize-name');

const User = require('../models/user');

// Attempt to limit spam post requests for inserting data
const minutes = 5;
const postLimiter = new RateLimit({
  windowMs: minutes * 60 * 1000, // milliseconds
  max: 100, // Limit each IP to 100 requests per windowMs 
  delayMs: 0, // Disable delaying - full speed until the max limit is reached 
  handler: (req, res) => {
    res.status(429).json({ success: false, msg: `You made too many requests. Please try again after ${minutes} minutes.` });
  }
});

// READ (ONE)
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(404).json({ success: false, msg: `No such user.` });
    });
});

// READ (ALL)
router.get('/', (req, res) => {
  User.find({})
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(500).json({ success: false, msg: returnError(err) });
    });
});

// CREATE
router.post('/', postLimiter, (req, res) => {
  const { name, email, age, gender } = req.body;

  // Validate the age
  let age = sanitizeAge(req.body.age);
  if (age < 5 && age != '') return res.status(403).json({ success: false, msg: `You're too young for this.` });
  else if (age > 130 && age != '') return res.status(403).json({ success: false, msg: `You're too old for this.` });

  let newUser = new User({
    name: sanitizeName(name),
    email: sanitizeEmail(email),
    age: sanitizeAge(age),
    gender: sanitizeGender(gender)
  });

  newUser.save()
    .then((result) => {
      return res.status(200).json({
        success: true,
        msg: `Successfully added!`,
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
      return res.status(400).json({ success: false, msg: returnError(err) });
    });
});

// UPDATE
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age, gender } = req.body;
  // Validate the age
  let age = sanitizeAge(req.body.age);
  if (age < 5 && age != '') return res.status(403).json({ success: false, msg: `You're too young for this.` });
  else if (age > 130 && age != '') return res.status(403).json({ success: false, msg: `You're too old for this.` });

  let updatedUser = {
    name: sanitizeName(name),
    email: sanitizeEmail(email),
    age: sanitizeAge(age),
    gender: sanitizeGender(gender)
  };

  User.findOneAndUpdate({ _id: id }, updatedUser, { runValidators: true, context: 'query' })
    .then((oldResult) => {
      User.findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: newResult._id,
              name: newResult.name,
              email: newResult.email,
              age: newResult.age,
              gender: newResult.gender
            }
          });
        })
        .catch((err) => {
          return res.status(500).json({ success: false, msg: returnError(err) });
        });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, msg: returnError(err) });
    });
});

// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
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
      return res.status(404).json({ success: false, msg: 'Nothing to delete.' });
    });
});

module.exports = router;

// Minor sanitizing to be invoked before reaching the database
sanitizeName = (name) => {
  return stringCapitalizeName(name);
}
sanitizeEmail = (email) => {
  return email.toLowerCase();
}
sanitizeAge = (age) => {
  // Return empty if age is non-numeric
  if (isNaN(age) && age != '') return '';
  return (age === '') ? age : parseInt(age);
}
sanitizeGender = (gender) => {
  // Return empty if it's neither of the two
  return (gender === 'm' || gender === 'f') ? gender : '';
}

returnError = (err) => {
  let errorMessage = `Something went wrong. ${err}`;
  
  if (err.errors) {
    if (err.errors.name) {
      errorMessage = err.errors.name.message;
    } else if (err.errors.email) {
      errorMessage = err.errors.email.message;
    } else if (err.errors.age) {
      errorMessage = err.errors.age.message;
    } else if (err.errors.gender) {
      errorMessage = err.errors.gender.message;
    }
  }
  
  return errorMessage;
};
