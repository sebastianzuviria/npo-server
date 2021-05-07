const { Testimonial } = require("../models/index");

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      attributes: ["name", "content", "id"],
    });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTestimonialById = async (req, res) => {
  const id = req.params.id;
  try {
    testimonial = await Testimonial.findByPk(id, {
      attributes: ["id", "name", "content"],
    });
    if (testimonial) {
      res.status(200).json(testimonial);
    } else {
      res
        .status(400)
        .json({ error: "it looks like what you are looking for is not here" });
    }
  } catch {
    res.status(400).json({ error: error.message });
  }
};

const newTestimonial = async (req, res) => {
  const body = req.body;

  try {
    const newTestimonial = await Testimonial.create({
      name: body.name,
      content: body.content,
    });
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(400).json({ status: 400, error: error.message });
  }
};

const updateTestimonial = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const updateTestimonial = await Testimonial.update(
      {
        name: body.name,
        content: body.content,
      },
      { where: { id } }
    );
    res.status(200).json(updateTestimonial);

    const updatedTestimonial = await Testimonial.findByPk(id);

    return !updatedTestimonial
      ? res.status(400).send({ error: "Testimonial does not exist" })
      : res.json(updatedTestimonial);
  } catch (error) {
    res.status(400).json({ status: 400, error: error.message });
  }
};

const testimonialController = {
  getTestimonials,
  getTestimonialById,
  newTestimonial,
  updateTestimonial,
};

module.exports = testimonialController;
