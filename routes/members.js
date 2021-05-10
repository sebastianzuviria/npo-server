<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { getMembers } = require('../controllers/members');


router.get('/', getMembers);

module.exports=router;
=======
const express = require("express");
const router = express.Router();

const deleteMember = require('../controllers/members')


router.delete("/:id",deleteMember);

module.exports = router;
>>>>>>> 2e0ccebb7dd63c7be72a13605dd65d1fa0a229e1
