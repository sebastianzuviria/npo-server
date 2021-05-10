const express = require('express');
const router = express.Router();
const { getMembers, deleteMember, createMembers } = require('../controllers/members');

router.get('/', getMembers);

router.post('/', createMembers);

router.delete("/:id",deleteMember);

module.exports = router;




