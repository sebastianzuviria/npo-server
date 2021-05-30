const { Novelty } = require('../models/index');
const { Category } = require('../models/index')
const imageServices = require('../services/amazonS3/imageServices')
const { validationResult } = require('express-validator');


const getNovelties = async (request, response) => {

    try {
        const noveltiesReturned = await Novelty.findAll({
            where: {
                type: 'news'
            }, 
            attributes: ['id', 'title', 'image', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });
        response.status(200).json(noveltiesReturned);
    } catch (error) {
        response.status(400).json({ error: error.message });
    };
};

const getNoveltyById = async (request, response) => {
    const id = request.params.id;

    try {
        const noveltyReturned = await Novelty.findByPk(id, {
            include: {
                association: "category",
                attributes: ["id","name"],
            },
            attributes: ['id', 'title', 'image', 'content', 'type', 'createdAt'],
        });
        if (noveltyReturned){ 
            response.status(200).json(noveltyReturned);
        } else {
            response.status(404).json({ error: 'new not exist' });
        }
    } catch (error) {
        response.status(400).json({ error: error.message });
    };
};

const deleteNovelty = async (request, response) => {
    const id = request.params.id;

    try {
        const noveltyToDelete = await Novelty.findByPk(id);
        if(noveltyToDelete) {
            await Novelty.destroy({
                where: {
                    id: id
                }
            });
            await imageServices.deleteImage(noveltyToDelete.image)
            response.status(204).end();
        } else {
            response.status(404).json({ error: 'New not exist' });
        }
    } catch (error) {
        response.status(400).json({ error: error.message });
    };
};

const createNovelty = async (request, response) => {
    console.log('BODY: ', request.body)
    console.log('FILE: ', request.file)
    const body = request.body;
    const validationErrors = validationResult(request);

    // Check for validation errors
    if (!validationErrors.isEmpty()) {
      response.status(400).json({
        validationErrors: validationErrors.array()
      }).end();
    } else {
      try {
        const category = await Category.findByPk(body.category);
        if(category) {
            const urlOfImage = await imageServices.uploadImage(request.file)
            const newNovelty = await Novelty.create({
                title: body.title,
                image: urlOfImage,
                content: body.content,
                categoryId: category.id,
                type: 'news'
            });
            response.status(201).json(newNovelty);
        } else {
           response.status(400).json({ error: 'category not exist'});  
        }
      } catch (error) {
        console.log(error.message)
        response.status(400).json({ error: error.message });
      }
    }    
}

const updateNovelty = async (request, response) => {
    console.log('BODY: ', request.body)
    console.log('FILE: ', request.file)
    const id = request.params.id
    const body = request.body;
    const validationErrors = validationResult(request);

    // Check for validation errors
    if (!validationErrors.isEmpty()) {
      response.status(400).json({
        validationErrors: validationErrors.array()
      }).end();
    } else {
      try {
        const category = await Category.findByPk(body.category);
        if(category) {
            const urlOfImage = async () => {
                if(request.file) {
                    const url = await imageServices.uploadImage(request.file)
                    await imageServices.deleteImage(body.imageUrl)
                    return url
                } else {
                    return body.imageUrl
                }
            }
            
            const isUpdatedNovelty = await Novelty.update({
                title: body.title,
                image: await urlOfImage(),
                content: body.content,
                categoryId: category.id,
                type: 'news'
            }, { where: { id: id } });
            if(isUpdatedNovelty[0] === 1) {
                const updatedNovelty = await Novelty.findByPk(id)
                response.status(200).json(updatedNovelty);
            } else {
                response.status(404).json({ error: 'New not exist'})
            } 
        } else {
           response.status(400).json({ error: 'category not exist'});  
        }
      } catch (error) {
        response.status(400).json({ error: error.message });
      }
    }    
}


const noveltyController = {
    getNovelties,
    getNoveltyById,
    deleteNovelty,
    createNovelty,
    updateNovelty
}

module.exports = noveltyController