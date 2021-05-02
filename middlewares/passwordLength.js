const { body } = require('express-validator');

const passwordLength = [body('password').isLength({ min: 5 })];

module.exports = passwordLength;
