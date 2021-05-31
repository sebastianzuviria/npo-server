const express = require("express");
const router = express.Router();
const { verifyAdmin } = require('../middlewares/verifyRoles');
const { getSlides, updateSlide } = require('../controllers/slides');
const imageServices = require('../services/amazonS3/imageServices');

router.get("/:id", getSlides);
router.put("/:id", verifyAdmin, imageServices.uploadMiddleware, updateSlide);

module.exports = router;