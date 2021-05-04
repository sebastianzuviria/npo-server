var express = require('express');
var router = express.Router();

const { verifyAdmin } = require('../middlewares/verifyRoles');
const { getUsers } = require('../controllers/users.controllers');
const infouser =require('../controllers/users');

var bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

// Import models
const { User } = require('../models/index');

const { deleteUser} = require('../controllers/user');

/* GET users listing. */
router.get('/', verifyAdmin, getUsers);

/* DELETE (soft or logical) from DB */
router.delete('/:id', deleteUser);

//Get the information of the authenticated user
router.get('/auth/me/:id',infouser);
/* POST a new user (register) */
router.post(
  '/auth/register',
  body('firstName', 'First name field is not valid').isAlpha().notEmpty(),
  body('lastName', 'Last name field is not valid').isAlpha().notEmpty(),
  body('email', 'The email is not valid').isEmail().notEmpty(),
  body('password', 'The password is not valid').isLength({ min: 6 }).notEmpty(),
  (req, res, next) => {
    const validationErrors = validationResult(req);

    // Check for validation errors
    if (!validationErrors.isEmpty()) {
      res.status(400).json({
        validationErrors: validationErrors.array()
      });
    }

    // Check if user is already registered
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          // Hash password
          bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
            if (err) {
              res.status(500).json({
                message: 'Could not register user',
                error: err
              });
            } else {
              // Register user to the database
              User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword
              })
                .then((newUser) => {
                  res.status(201).json({
                    message: 'User registered successfuly',
                    user: newUser
                  });
                })
                .catch((error) => {
                  res.status(500).json({
                    message: 'Could not register user',
                    error: error.message
                  });
                });
            }
          });
        } else {
          res.status(409).json({
            message: 'User already registered'
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Could not register user',
          error: error.message
        });
      });
  }
);

module.exports = router;
