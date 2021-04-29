var express = require('express');
var router = express.Router();
const {getUsers} = require('../controllers/users.controllers')

const { deleteUser } = require('../controllers/user');

/* GET users listing. */
router.get('/', getUsers);

/* DELETE (soft or logical) from DB */
router.delete('/:id', deleteUser);

module.exports = router;
