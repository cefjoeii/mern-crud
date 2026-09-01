const rateLimit = require('express-rate-limit');
const stringCapitalizeName = require('string-capitalize-name');

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

module.exports = {
  postLimiter,
  sanitizers,
  validateAge,
  handleValidationError,
  formatUser,
  sanitizeUser
};
