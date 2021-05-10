const express = require('express');
const router = express.Router();

const { getMembers, deleteMember } = require('../controllers/members');


router.get('/', getMembers);

router.delete("/:id",deleteMember);

module.exports = router;




