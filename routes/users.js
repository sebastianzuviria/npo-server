var express = require('express');
var router = express.Router();
const { body, validationResult, check } = require('express-validator');

// Import models
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST a new user (register) */
router.post('/auth/register', [
  check('firstName', 'The username is not valid').exists(),
  check('lastName', 'The last name is not valid').exists(),
  check('email', 'The email is not valid').exists().isEmail(),
  check('password', 'The password is not valid').exists().isLength({min: 6})
], (req, res, next) => {
  const validationErrors = validationResult(req);

  // Check for validation errors
  if (!validationErrors.isEmpty()) {
    res.status(400).json({
      validationErrors: validationErrors.array()
    })
  }
});

module.exports = router;
