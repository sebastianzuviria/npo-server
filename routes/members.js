const express = require('express');
const router = express.Router();

const {createMembers} = require('../controllers/members');

router.post('/', createMembers);

module.exports = router;
