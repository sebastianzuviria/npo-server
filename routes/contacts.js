var express = require('express');
var router = express.Router();

const contacts = [
    {'id':'1', 'nombre':'Emiliano'},
    {'id':'2', 'nombre':'Jonathan'},
    {'id':'3', 'nombre':'Gabriel'},
    {'id':'4', 'nombre':'Sebastian'},
    {'id':'5', 'nombre':'Bruno'},
    {'id':'6', 'nombre':'Nataly'},
    {'id':'7', 'nombre':'Franco'},
    {'id':'8', 'nombre':'Ariel'}
]
/* GET users listing. */
router.get('/contacts', function(req, res, next) {
  res.send(contacts);
});

module.exports = router;
