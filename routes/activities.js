const router = require('./index');
const { postActivity } = require('../controllers/activities');
const validateBody = require('../middlewares/validateBody');
const notEmpty = require('../middlewares/notEmpty');

router.post('/activities',
    notEmpty( 'content' ),
    notEmpty( 'name' ),
    validateBody,
    postActivity
);

module.exports = router;