const { body } = require('express-validator');

const nameIsAlpha = [
  body('name')
    .isLength({ min: 5 })
    .custom((value) => {
      return value.match(/^[A-Za-z ]+$/);
    })
];

module.exports = nameIsAlpha;
