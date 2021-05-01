'use-strict'

const { Activity } = require('../models/index');

module.exports = {

    postActivity: async (req, res) => {

        const { content, image, name } = request.body;

        try {

            await Activity.create({
                content,
                image,
                name
            });
            return response.json( { message: 'Activity posted successfuly' } ); // Improve response? 

        } catch (error) {

            res.status(400).send(error.message);

        } 
    }
}