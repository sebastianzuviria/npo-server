const { Novelty } = require('../models/index');

const getNovelties = async (request, response) => {

    try {
        const noveltiesReturned = await Novelty.findAll({
            // include: {
            //     model: Category,
            //     attributes: ['name']
            // }, 
            attributes: ['id', 'name', 'image', 'content', 'categoryId', 'type', 'createdAt'],
            order: [['createdAt', 'DESC']]
        })
        console.log(noveltiesReturned)
        response.json( {message: 'Return all novelties'} )
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
            attributes: ['id', 'name', 'image', 'content', 'categoryId', 'type', 'createdAt'],
        })
        //if (newReturned){ 
            //response.json(newReturned)
        if(id){ //This if is only for test
            response.json({ message: 'novelty returned by id'})
        } else {
            response.status(400).json({ error: 'new not exist' })
        }
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
}


const noveltyController = {
    getNovelties,
    getNoveltyById
}

module.exports = noveltyController