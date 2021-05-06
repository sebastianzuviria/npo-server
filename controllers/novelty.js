const { Novelty } = require('../models/index');
// const { Category } = require('../models/index')

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
            response.json(noveltyReturned);
        } else {
            response.status(400).json({ error: 'new not exist' });
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
            response.status(204).json({ message: 'New deleted' });
        } else {
            response.status(400).json({ error: 'New not exist' });
        }
    } catch (error) {
        response.status(400).json({ error: error.message });
    };
};

const createNovelty = async (request, response) => {
    const body = request.body;

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


const noveltyController = {
    getNovelties,
    getNoveltyById,
    deleteNovelty
}

module.exports = noveltyController