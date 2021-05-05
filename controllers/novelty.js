const { Novelty } = require('../models/index');

const getNovelties = async (request, response) => {

    try {
        const noveltiesReturned = await Novelty.findAll({
            // include: {
            //     model: Category,
            //     attributes: ['name']
            // }, 
            attributes: ['id', 'title', 'image', 'content', 'categoryId', 'type', 'createdAt'],
            order: [['createdAt', 'DESC']]
        })
        console.log(noveltiesReturned)
        response.json(noveltiesReturned)
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
}

const getNoveltyById = async (request, response) => {
    const id = request.params.id

    try {
        const noveltyReturned = await Novelty.findByPk(id, {
            // include: {
            //     model: Category,
            //     attributes: ['name']
            // },
            attributes: ['id', 'title', 'image', 'content', 'categoryId', 'type', 'createdAt'],
        })
        if (noveltyReturned){ 
            response.json(noveltyReturned)
        } else {
            response.status(400).json({ error: 'new not exist' })
        }
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
}

const deleteNovelty = async (request, response) => {
    const id = request.params.id

    try {
        const noveltyToDelete = await Novelty.findByPk(id)
        if(noveltyToDelete) {
            await Novelty.destroy({
                where: {
                    id: id
                }
            })
            response.status(204).json({ message: 'New deleted' })
        } else {
            response.status(400).json({ error: 'New not exist' })
        }
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
}


const noveltyController = {
    getNovelties,
    getNoveltyById,
    deleteNovelty
}

module.exports = noveltyController