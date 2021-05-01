const { body } = require('express-validator');

const isEmail = [body('email').isEmail()];

module.exports = isEmail;
