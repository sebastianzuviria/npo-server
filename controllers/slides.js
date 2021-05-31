'use-strict';

const { Slide } = require('../models/index');

    const getSlides = async (req,res)=> {

        const id = req.params.id;

        try {

            const slides = await Slide.findAll({where: { organizationId: id } });
            return res.status(200).json(slides)
            
        } catch(err) {
            
            res.status(400).json({error: err.message})

        }
    };


module.exports = { getSlides }