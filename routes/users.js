const express = require('express');
const rateLimit = require('express-rate-limit');
const stringCapitalizeName = require('string-capitalize-name');
const User = require('../models/user');

const router = express.Router();

const { postLimiter, sanitizers, validateAge, handleValidationError, formatUser, sanitizeUser } = require('../utils/utils');

// GET single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    res.status(404).json({ success: false, msg: 'User not found.' });
  }
});

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Something went wrong.' });
  }
});

// CREATE user
router.post('/', postLimiter, async (req, res) => {
  try {
    const sanitized = sanitizeUser(req.body);
    
    // Validate age
    const ageError = validateAge(sanitized.age);
    if (ageError) {
      return res.status(403).json({ success: false, msg: ageError });
    }

    const newUser = new User(sanitized);
    const result = await newUser.save();

    res.status(201).json({
      success: true,
      msg: 'Successfully added!',
      result: formatUser(result)
    });
  } catch (err) {
    handleValidationError(err, res);
  }
});

// UPDATE user
router.put('/:id', async (req, res) => {
  try {
    const sanitized = sanitizeUser(req.body);
    
    // Validate age
    const ageError = validateAge(sanitized.age);
    if (ageError) {
      return res.status(403).json({ success: false, msg: ageError });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      sanitized,
      { runValidators: true, context: 'query', new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found.' });
    }

    res.json({
      success: true,
      msg: 'Successfully updated!',
      result: formatUser(user)
    });
  } catch (err) {
    handleValidationError(err, res);
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found.' });
    }

    res.json({
      success: true,
      msg: 'Successfully deleted!',
      result: formatUser(user)
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Something went wrong.' });
  }
});

module.exports = router;
