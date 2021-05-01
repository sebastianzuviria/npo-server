var express = require('express');
var router = express.Router();

const contacts = [
    {'id':'1', 'name':'Emiliano', 'email':'email@123.com', 'message':'Hi this is a message'},
    {'id':'2', 'name':'Jonathan', 'email':'email@123.com', 'message':'Hi this is a message'},
    {'id':'3', 'name':'Gabriel', 'email':'email@123.com', 'message':'Hi this is a message'},
    {'id':'4', 'name':'Sebastian', 'email':'email@123.com', 'message':'Hi this is a message'},
    {'id':'5', 'name':'Bruno', 'email':'email@123.com', 'message':'Hi this is a message'},
    {'id':'6', 'name':'Nataly', 'email':'email@123.com', 'message':'Hi this is a message'},
    {'id':'7', 'name':'Franco', 'email':'email@123.com', 'message':'Hi this is a message'},
    {'id':'8', 'name':'Ariel', 'email':'email@123.com', 'message':'Hi this is a message'}
]
/* GET users listing. */
router.get('/contacts', function(req, res, next) {
  res.send(contacts);
});

module.exports = router;
