const express = require("express");
const router = express.Router();
const { verifyAdmin } = require('../middlewares/verifyRoles');
const { getSlides } = require('../controllers/slides')

router.get("/:id", getSlides);

module.exports = router;