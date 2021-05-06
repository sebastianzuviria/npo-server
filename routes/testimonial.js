const router = require("./index");
const { validationResult } = require("express-validator");
const { newTestimonial } = require("../controllers/testimonial");

router.post(
  "/testimonials",
  body("name", "Name is mandatory").notEmpty(),
  body("content", "Content is mandatory").notEmpty(),
  (req, res) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      res.status(400).json({ validation: validation.array() });
    }
    newTestimonial(req, res);
  }
);

module.exports = router;
