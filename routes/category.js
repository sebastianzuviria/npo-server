const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middlewares/verifyRoles');
const { getCategories, createCategory, updateCategory } = require('../controllers/categories');

router.get('/', verifyAdmin, getCategories);
router.post('/', verifyAdmin, createCategory);
router.put('/', verifyAdmin, updateCategory);

module.exports = router;