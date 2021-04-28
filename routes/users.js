var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

// Import models
const { User } = require('../models/index');

// Import Database Connection Object
const db = require('../db/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST a new user (register) */
router.post('/auth/register',
  body('firstName', 'First name field is not valid').isAlpha().notEmpty(),
  body('lastName', 'Last name field is not valid').isAlpha().notEmpty(),
  body('email', 'The email is not valid').isEmail().notEmpty(),
  body('password', 'The password is not valid').isLength({min: 6}).notEmpty(), 
  (req, res, next) => {
  const validationErrors = validationResult(req);

  // Check for validation errors
  if (!validationErrors.isEmpty()) {
    res.status(400).json({
      validationErrors: validationErrors.array()
    })
  }

  // Register user to the database
  User.create({ 
    firstName: req.body.firstName, 
    lastName: req.body.lastName, 
    email: req.body.email, 
    password: req.body.password 
  })
  .then(user => {
    console.log('New user to be registered', user);
    res.status(200).json({
      'message': 'User registered successfuly',
      'user': user
    })
  })
  .catch(error => {
    res.status(500).json({
      'message': 'Could not register user',
      'error': error.message
    })
  })
});

module.exports = router;
