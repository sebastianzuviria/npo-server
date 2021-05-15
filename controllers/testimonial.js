const { Testimonial } = require('../models/index');

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      attributes: ['name', 'content', 'id'],
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
      attributes: ['id', 'name', 'content'],
    });
    if (testimonial) {
      res.status(200).json(testimonial);
    } else {
      res
        .status(404)
        .json({ error: 'testimonial not exist' });
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
      { where: { id: id } }
    );
    if (updateTestimonial[0] === 1) {
      const updatedTestimonial = await Testimonial.findByPk(id);
      res.status(200).json(updatedTestimonial);
    } else {
      res
        .status(400)
        .json({ error: 'it looks like what you are looking for is not here' });
    }
  } catch (error) {
    res.status(400).json({ status: 400, error: error.message });
  }
};

const deleteTestimonial = async (req, res) => {
  const id = req.params.id;

  try {
    const testimonialToDelete = await Testimonial.findByPk(id);
    if (testimonialToDelete) {
      await Testimonial.destroy({
        where: { id: id },
      });
      res.status(204).end();
    } else {
      res
        .status(400)
        .json({ error: 'it looks like what you are looking for is not here' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//exports
const testimonialController = {
  getTestimonials,
  getTestimonialById,
  newTestimonial,
  updateTestimonial,
  deleteTestimonial,
};

module.exports = testimonialController;
