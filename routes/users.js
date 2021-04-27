var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST a new user (register) */
router.post('/auth/register', (req, res, next) => {
  res.send('Hello from register endpoint.');
});

module.exports = router;
