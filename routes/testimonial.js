const router = require('./index');
const {
  newTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonial');
const notEmpty = require('../middlewares/notEmpty');
const validateBody = require('../middlewares/validateBody');

router.post(
  '/testimonials',
  notEmpty('name'),
  notEmpty('content'),
  validateBody,
  newTestimonial
);

router.put(
  '/testimonials/:id',
  notEmpty('name'),
  notEmpty('content'),
  validateBody,
  updateTestimonial
);

router.get('/testimonials', getTestimonials);

router.get('/testimonials/:id', getTestimonialById);
module.exports = router;
