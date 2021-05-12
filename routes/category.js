const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middlewares/verifyRoles');
const { getCategories, createCategory, deleteCategory } = require('../controllers/categories');

router.get('/', verifyAdmin, getCategories);
router.post('/', verifyAdmin, createCategory);
router.delete('/:id',verifyAdmin, deleteCategory);

module.exports = router;