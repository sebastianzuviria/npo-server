const express = require("express");
const router = express.Router();

const deleteMember = require('../controllers/members')


router.delete("/:id",deleteMember);

module.exports = router;
