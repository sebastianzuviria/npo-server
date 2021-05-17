const express = require('express');
const router = express.Router();
const { getMembers, deleteMember, createMembers, updateMember } = require('../controllers/members');

router.get('/', getMembers);

router.post('/', createMembers);

router.delete("/:id",deleteMember);

router.put("/:id",updateMember);

module.exports = router;




