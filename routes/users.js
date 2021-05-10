const express = require('express');
const router = express.Router();

// middlewares
const { verifyAdmin } = require('../middlewares/verifyRoles');
const validateBody = require('../middlewares/validateBody');

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
  body('email', 'The email is not valid').isEmail().notEmpty(),
  body('password', 'The password is not valid').isLength({ min: 6 }).notEmpty(),
  validateBody,
  registerUser
);

module.exports = router;
