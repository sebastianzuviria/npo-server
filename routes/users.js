var express = require('express');
var router = express.Router();
var infouser =require('../controllers/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Get the information of the authenticated user
router.get('/auth/me',infouser);

module.exports = router;
