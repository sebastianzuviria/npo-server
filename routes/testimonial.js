const testimonialRouter = require('express').Router();
const {
  newTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonial');
const notEmpty = require('../middlewares/notEmpty');
const validateBody = require('../middlewares/validateBody');

testimonialRouter.post(
  '/',
  notEmpty('name'),
  notEmpty('content'),
  validateBody,
  newTestimonial
);

testimonialRouter.put(
  '/:id',
  notEmpty('name'),
  notEmpty('content'),
  validateBody,
  updateTestimonial
);

testimonialRouter.delete('/:id', deleteTestimonial);

testimonialRouter.get('', getTestimonials);

testimonialRouter.get('/:id', getTestimonialById);

module.exports = testimonialRouter;
