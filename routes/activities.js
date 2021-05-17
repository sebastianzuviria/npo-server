const router = require('./index');
const { postActivity, updateActivity, getActivities, getActivityById, deleteActivity } = require('../controllers/activities');
const validateBody = require('../middlewares/validateBody');
const notEmpty = require('../middlewares/notEmpty');

router.post('/activities',
    notEmpty( 'content' ),
    notEmpty( 'name' ),
    notEmpty( 'userId' ),
    validateBody,
    postActivity
);

router.put('/activities/:id',
    notEmpty( 'content' ),
    notEmpty( 'name' ),
    notEmpty( 'userId' ),
    validateBody,
    updateActivity
);

router.get('/activities', getActivities);

router.get('/activities/:id', getActivityById);

router.delete('/activities/:id', deleteActivity);


module.exports = router;