const express = require('express');
const router = express.Router();

const { getMembers } = require('../controllers/members');


router.get('/', getMembers);

module.exports=router;