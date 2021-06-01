const express = require("express");
const router = express.Router();
const { verifyAdmin } = require('../middlewares/verifyRoles');
const {getOrganization,updateOrganization} = require('../controllers/organization')
const imageServices = require('../services/amazonS3/imageServices')


router.get("/public", getOrganization);
router.put("/:id",verifyAdmin, imageServices.uploadMiddleware, updateOrganization);

module.exports = router;
