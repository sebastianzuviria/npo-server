var express = require('express');
var router = express.Router();

// model
const { User } = require('../models/index');

// middlewares
const { verifyAdmin } = require('../middlewares/verifyRoles');
const validateBody = require('../middlewares/validateBody');

// utils
const bcrypt = require('bcrypt');
const { body } = require('express-validator');

// controllers
const { deleteUser, infoUser, getUsers, registerUser } = require('../controllers/users');

/* GET users listing. */
router.get('/', verifyAdmin, getUsers);

/* DELETE (soft or logical) from DB */
router.delete('/:id', deleteUser);

//Get the information of the authenticated user
router.get('/auth/me/:id', infoUser);

/* POST a new user (register) */
router.post(
  '/auth/register',
  body('firstName', 'First name field is not valid').isAlpha().notEmpty(),
  body('lastName', 'Last name field is not valid').isAlpha().notEmpty(),
  body('email', 'The email is not valid').isEmail().notEmpty(),
  body('password', 'The password is not valid').isLength({ min: 6 }).notEmpty(),
  validateBody,
  registerUser
);

module.exports = router;
