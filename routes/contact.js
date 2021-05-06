const nameLength = require('../middlewares/nameLength');
const isEmail = require('../middlewares/isEmail');
const validateBody = require('../middlewares/validateBody');
const { verifyAdmin } = require('../middlewares/verifyRoles');
const newContact = require('../controllers/contact');
const getContacts = require('../controllers/contact');

const router = require('express').Router();

router.route('/').post(nameLength, isEmail, validateBody, newContact);
router.get('/', verifyAdmin, getContacts);

module.exports = router;
