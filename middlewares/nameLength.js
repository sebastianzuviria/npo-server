const { body } = require('express-validator');

const nameLength = [body('name').isLength({ min: 5 }).isAlpha()];

module.exports = nameLength;
