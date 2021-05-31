const express = require('express');
const router = express.Router();
const { getCategories, createCategory, deleteCategory, updateCategory } = require('../controllers/categories');

router.get('/', getCategories);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);
router.put('/', updateCategory);

module.exports = router;