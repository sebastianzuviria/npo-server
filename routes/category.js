const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middlewares/verifyRoles');
const { getCategories, createCategory } = require('../controllers/categories');

router.get('/', verifyAdmin, getCategories);
router.post('/', verifyAdmin, createCategory);

module.exports = router;