const { body } = require('express-validator');

const notEmpty = ( value ) => {

    return body( value, `${value} is mandatory.`).notEmpty();

} 

module.exports = notEmpty;
