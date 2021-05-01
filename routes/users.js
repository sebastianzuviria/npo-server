var express = require('express');
var router = express.Router();
const { verifyAdmin } = require('../middlewares/verifyRoles');
const {getUsers} = require('../controllers/users.controllers');

/* GET users listing. */
router.get('/', verifyAdmin, getUsers);

module.exports = router;
