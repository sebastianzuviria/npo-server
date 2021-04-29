var express = require('express');
var router = express.Router();

const { deleteUser } = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* DELETE (soft or logical) from DB */
router.delete('/:id', deleteUser);

module.exports = router;
