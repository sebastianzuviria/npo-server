'use-strict';

const { Slide } = require('../models/index');
const imageServices = require('../services/amazonS3/imageServices')

    const getSlides = async (req,res)=> {

        const id = req.params.id;

        try {

            const slides = await Slide.findAll({where: { organizationId: id } });
            return res.status(200).json(slides)
            
        } catch(err) {
            
            res.status(400).json({error: err.message})

        }
    };

    const updateSlide = async (req,res)=> {

        const id = req.params.id;
        const { imageUrl, text, order } = req.body;

        const urlOfImage = async () => {

            if (req.file) {
    
                const url = await imageServices.uploadImage(req.file);
                await imageServices.deleteImage(imageUrl);
                return url;
    
            } else {
                return imageUrl;
            }
        }

        try {

            await Slide.update({
                imageUrl: await urlOfImage(),
                order,
                text
            }, { where: { id } } );

            // Get the updated activity
            const updatedSlide = await Slide.findByPk( id );

            return ( !updatedSlide ) ? res.status(400).json( { error: 'Slide not Found' } ) : res.status(200).json( updatedSlide );
            
        } catch(err) {
            
            res.status(400).json({error: err.message})

        }
    };


module.exports = { getSlides, updateSlide }