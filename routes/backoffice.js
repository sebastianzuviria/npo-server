const router = require('express').Router();
const {listContact} = require('../controllers/backoffice')

router.get('/contacts', listContact)

module.exports = router;
