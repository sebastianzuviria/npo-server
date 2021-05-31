const noveltyRouter = require('express').Router();
const noveltyController = require('../controllers/novelty');
const noveltyValidation = require('../middlewares/noveltyValidation');
const imageServices = require('../services/amazonS3/imageServices')

noveltyRouter.get('/', noveltyController.getNovelties)
noveltyRouter.get('/:id', noveltyController.getNoveltyById)
noveltyRouter.delete('/:id', noveltyController.deleteNovelty)
noveltyRouter.post('/', imageServices.uploadMiddleware, noveltyController.createNovelty)
noveltyRouter.put('/:id', imageServices.uploadMiddleware, noveltyController.updateNovelty)

module.exports = noveltyRouter;