const router = require("./index");
const { validationResult } = require("express-validator");
const {
  newTestimonial,
  getTestimonials,
  getTestimonialById,
} = require("../controllers/testimonial");
const notEmpty = require("../middlewares/notEmpty");
const validateBody = require("../middlewares/validateBody");

router.post(
  "/testimonials",
  notEmpty("name"),
  notEmpty("content"),
  validateBody,
  newTestimonial
);

router.get("/testimonials", getTestimonials);

router.get("/testimonials/:id", getTestimonialById);
module.exports = router;
