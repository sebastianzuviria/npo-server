const router = require('./index');
const { postActivity, updateActivity } = require('../controllers/activities');
const validateBody = require('../middlewares/validateBody');
const notEmpty = require('../middlewares/notEmpty');

router.post('/activities',
    notEmpty( 'content' ),
    notEmpty( 'name' ),
    validateBody,
    postActivity
);

router.put('/activities/:id',
    notEmpty( 'content' ),
    notEmpty( 'name' ),
    validateBody,
    updateActivity
);

module.exports = router;