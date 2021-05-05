const noveltyRouter = require('express').Router();
const noveltyController = require('../controllers/novelty')

noveltyRouter.get('/', noveltyController.getNovelties)
noveltyRouter.get('/:id', noveltyController.getNoveltyById)

module.exports = noveltyRouter;