const express = require('express');
const router = express.Router();
const config = require('../config/db');
const User = require('../models/user');

router.get('/', (req, res) => {
  User.find({}).then((data) => {
    res.json(data);
  });
});

router.post('/', (req, res) => {

  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    age: parseInt(req.body.age),
    gender: req.body.gender
  });

  newUser.save((err, addedUser) => {

    if(err) {
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
        res.status(400).json( { success: false, msg: 'Failed to register.'});
      }
    }

    else {
      res.json({
        success: true,
        msg: 'Successfully added!',
        addedUser: {
          _id: addedUser._id,
          name: addedUser.name,
          email: addedUser.email,
          age: addedUser.age,
          gender: addedUser.gender
        }
      });
    }
  });
});

module.exports = router;
