const express = require("express");
const router = express.Router();
const { verifyAdmin } = require('../middlewares/verifyRoles');
const {getOrganization,updateOrganization} = require('../controllers/organization')

router.get("/public", getOrganization);
router.put("/:id",verifyAdmin, updateOrganization);

module.exports = router;
