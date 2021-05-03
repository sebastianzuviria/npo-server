const nameLength = require('../middlewares/nameLength');
const isEmail = require('../middlewares/isEmail');
const validateBody = require('../middlewares/validateBody');
const newContact = require('../controllers/contact');

const router = require('express').Router();

router.route('/').post(nameLength, isEmail, validateBody, newContact);

module.exports = router;
