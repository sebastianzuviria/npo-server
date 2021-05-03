const login = require('../controllers/login');
const isEmail = require('../middlewares/isEmail');
const passwordLength = require('../middlewares/passwordLength');
const validateBody = require('../middlewares/validateBody');

const router = require('express').Router();

router.route('/login').post(isEmail, passwordLength, validateBody, login);

module.exports = router;
