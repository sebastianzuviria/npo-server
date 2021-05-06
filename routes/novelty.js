const noveltyRouter = require('express').Router();
const noveltyController = require('../controllers/novelty');
const noveltyValidation = require('../middlewares/noveltyValidation');

noveltyRouter.get('/', noveltyController.getNovelties)
noveltyRouter.get('/:id', noveltyController.getNoveltyById)
noveltyRouter.delete('/:id', noveltyController.deleteNovelty)
noveltyRouter.post('/', noveltyValidation, noveltyController.createNovelty)

module.exports = noveltyRouter;