const { Novelty } = require('../models/index');
// const { Category } = require('../models/index')
const { validationResult } = require('express-validator');


const getNovelties = async (request, response) => {

    try {
        const noveltiesReturned = await Novelty.findAll({
            // include: {
            //     model: Category,
            //     attributes: ['name']
            // },
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
            // include: {
            //     model: Category,
            //     attributes: ['name']
            // },
            attributes: ['id', 'title', 'image', 'content', 'categoryId', 'type', 'createdAt'],
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
            response.status(204).end();
        } else {
            response.status(404).json({ error: 'New not exist' });
        }
    } catch (error) {
        response.status(400).json({ error: error.message });
    };
};

const createNovelty = async (request, response) => {
    const body = request.body;
    const validationErrors = validationResult(request);

    // Check for validation errors
    if (!validationErrors.isEmpty()) {
      response.status(400).json({
        validationErrors: validationErrors.array()
      }).end();
    } else {
      try {
        // const category = await Category.findOne({ where: { name: body.category }});
        // if(category) {
        const newNovelty = await Novelty.create({
            title: body.title,
            image: body.image,
            content: body.content,
            //categoryId: category.id
            categoryId: 1,
            type: 'news'
        });
            response.status(201).json(newNovelty);
        // } else {
        //   response.status(400).json({ error: 'category not exist'});  
        // }
      } catch (error) {
        response.status(400).json({ error: error.message });
      }
    }    
}

const updateNovelty = async (request, response) => {
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
        // const category = await Category.findOne({ where: { name: body.category }});
        // if(category) {
            const isUpdatedNovelty = await Novelty.update({
                title: body.title,
                image: body.image,
                content: body.content,
                //categoryId: category.id
                categoryId: 1,
                type: 'news'
            }, { where: { id: id } });
            if(isUpdatedNovelty[0] === 1) {
                const updatedNovelty = await Novelty.findByPk(id)
                response.status(200).json(updatedNovelty);
            } else {
                response.status(404).json({ error: 'New not exist'})
            } 
        // } else {
        //   response.status(400).json({ error: 'category not exist'});  
        // }
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