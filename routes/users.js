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
  registerUser,
  updateProfile,
  updateRoleId,
  updateImage
} = require('../controllers/users');
const userIsLogged = require('../middlewares/userIsLogged');
const {
  keysAreAccepted,
  valuesAreAlpha,
  validEmail
} = require('../middlewares/profileUpdateValidation');
const { uploadMiddleware } = require('../services/amazonS3/imageServices');

/* GET users listing. */
router.get('/', verifyAdmin, getUsers);
router.get('/auth/me', userIsLogged, infoUser);

/* DELETE (soft or logical) from DB */
router.delete('/', deleteUser);

// PUT user data and roleId(admin)
router.put(
  '/',
  userIsLogged,
  keysAreAccepted,
  valuesAreAlpha,
  validEmail,
  updateProfile
);
router.put('/updateimage', userIsLogged, uploadMiddleware, updateImage);
router.put('/:id', verifyAdmin, updateRoleId);

/* POST a new user (register) */
router.post(
  '/auth/register',
  body('firstName', 'First name field is not valid').isAlpha(),
  body('lastName', 'Last name field is not valid').isAlpha(),
  isEmail,
  passwordLength,
  validateBody,
  registerUser
);

module.exports = router;
