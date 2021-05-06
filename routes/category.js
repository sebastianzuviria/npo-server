const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middlewares/verifyRoles');
const { getCategories } = require('../controllers/categories');

router.get('/', verifyAdmin, getCategories);