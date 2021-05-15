const express = require('express');
const router = express.Router();

// middlewares
const { verifyAdmin } = require('../middlewares/verifyRoles');
const validateBody = require('../middlewares/validateBody');
const isEmail = require('../middlewares/isEmail');
const passwordLength = require('../middlewares/passwordLength');

// utils
const { body } = require('express-validator');

// controllers
const {
  deleteUser,
  infoUser,
  getUsers,
  registerUser
} = require('../controllers/users');

/* GET users listing. */
router.get('/', verifyAdmin, getUsers);
router.get('/:id', infoUser);

/* DELETE (soft or logical) from DB */
router.delete('/:id', deleteUser);

/* POST a new user (register) */
router.post(
  '/auth/register',
  body('firstName', 'First name field is not valid').isAlpha().notEmpty(),
  body('lastName', 'Last name field is not valid').isAlpha().notEmpty(),
  body('roleId', 'You must provide a role ID').notEmpty(),
  isEmail,
  passwordLength,
  validateBody,
  registerUser
);

module.exports = router;
