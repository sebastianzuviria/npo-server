const router = require('./index');
const { postActivity, updateActivity, listActivity, oneActivity } = require('../controllers/activities');
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

router.get('/activities', listActivity)

router.get('/activities/:id', oneActivity)


module.exports = router;