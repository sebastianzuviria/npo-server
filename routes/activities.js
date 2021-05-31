const router = require('./index');
const { postActivity, updateActivity, getActivities, getActivityById, deleteActivity } = require('../controllers/activities');
const validateBody = require('../middlewares/validateBody');
const notEmpty = require('../middlewares/notEmpty');
const imageServices = require('../services/amazonS3/imageServices')

router.post('/activities',
   /*  notEmpty( 'content' ),
    notEmpty( 'name' ),
    notEmpty( 'userId' ),
    validateBody, */
    imageServices.uploadMiddleware,
    postActivity
);

router.put('/activities/:id',
    /* notEmpty( 'content' ),
    notEmpty( 'name' ),
    notEmpty( 'userId' ),
    validateBody, */
    imageServices.uploadMiddleware,
    updateActivity
);

router.get('/activities', getActivities);

router.get('/activities/:id', getActivityById);

router.delete('/activities/:id', deleteActivity);


module.exports = router;