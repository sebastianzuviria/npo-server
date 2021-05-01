const express = require("express");
const router = express.Router();
const getOrganization = require('../controllers/organization')

router.get("/:id/public", getOrganization);

module.exports = router;
