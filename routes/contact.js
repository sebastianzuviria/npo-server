const nameIsAlpha = require('../middlewares/nameIsAlpha');
const isEmail = require('../middlewares/isEmail');
const validateBody = require('../middlewares/validateBody');
const { verifyAdmin } = require('../middlewares/verifyRoles');
const { newContact, getContacts } = require('../controllers/contact');

const router = require('express').Router();

router.route('/').post(nameIsAlpha, isEmail, validateBody, newContact);
router.get('/', verifyAdmin, getContacts);

module.exports = router;
