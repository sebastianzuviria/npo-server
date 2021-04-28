var express = require('express');
var router = express.Router();
const {getUsers} = require('../controllers/users.controllers')

/* GET users listing. */
router.get('/', getUsers);

module.exports = router;
