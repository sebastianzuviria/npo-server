const router = require('./index');
const { body, validationResult } = require('express-validator');
const postActivity = require('../controllers/activities')

router.post('/activities',
    body('content', 'Content is mandatory').notEmpty(),
    body('name', 'Name is mandatory').notEmpty(),
    (req, res, next) => {

        const validationErrors = validationResult(req);

        // Check for validation errors
        if (!validationErrors.isEmpty()) {
            res.status(400).json({
            validationErrors: validationErrors.array()
            })
        }
    
        // Proceed
        postActivity;

});

module.exports = router;