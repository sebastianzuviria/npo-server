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
  '/testimonials',
  notEmpty('name'),
  notEmpty('content'),
  validateBody,
  newTestimonial
);

testimonialRouter.put(
  '/testimonials/:id',
  notEmpty('name'),
  notEmpty('content'),
  validateBody,
  updateTestimonial
);

testimonialRouter.delete('/testimonials/:id', deleteTestimonial);

testimonialRouter.get('/testimonials', getTestimonials);

testimonialRouter.get('/testimonials/:id', getTestimonialById);

module.exports = testimonialRouter;
