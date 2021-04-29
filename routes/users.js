var express = require('express');
var router = express.Router();
const infouser =require('../controllers/users');

const {getUsers} = require('../controllers/users.controllers')

const { deleteUser, infouser } = require('../controllers/user');

/* GET users listing. */
router.get('/', getUsers);

/* DELETE (soft or logical) from DB */
router.delete('/:id', deleteUser);

//Get the information of the authenticated user
router.get('/auth/me',infouser);

module.exports = router;
