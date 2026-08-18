const express = require('express');
const rateLimit = require('express-rate-limit');
const stringCapitalizeName = require('string-capitalize-name');
const User = require('../models/user');

const router = express.Router();

// Rate limiter for POST requests
const postLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  handler: (req, res) => {
    res.status(429).json({ 
      success: false, 
      msg: 'Too many requests. Please try again in 5 minutes.' 
    });
  }
});

// Sanitization functions
const sanitizers = {
  name: (name) => stringCapitalizeName(name),
  email: (email) => email.toLowerCase(),
  age: (age) => {
    if (age === '') return '';
    if (isNaN(age)) return '';
    return parseInt(age);
  },
  gender: (gender) => (gender === 'm' || gender === 'f') ? gender : ''
};

// Validation helper
const validateAge = (age) => {
  if (age === '') return null;
  if (age < 5) return 'You\'re too young for this.';
  if (age > 130) return 'You\'re too old for this.';
  return null;
};

// Error handler for validation errors
const handleValidationError = (err, res) => {
  if (err.errors) {
    const field = Object.keys(err.errors)[0];
    return res.status(400).json({ 
      success: false, 
      msg: err.errors[field].message 
    });
  }
  res.status(500).json({ success: false, msg: 'Something went wrong.' });
};

// Format user response
const formatUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  age: user.age,
  gender: user.gender
});

// Sanitize request body
const sanitizeUser = (body) => ({
  name: sanitizers.name(body.name || ''),
  email: sanitizers.email(body.email || ''),
  age: sanitizers.age(body.age),
  gender: sanitizers.gender(body.gender || '')
});

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
    const user = await User.findByIdAndRemove(req.params.id);
    
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
