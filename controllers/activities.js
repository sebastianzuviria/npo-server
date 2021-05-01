'use-strict'

const { Activity } = require('../models/index');

module.exports = {

    postActivity: async (req, res) => {

        const { content, image, name } = req.body;

        try {

            await Activity.create({
                content,
                image,
                name
            });
            return res.json( { message: 'Activity posted successfully' } ); // Improve response? 

        } catch (error) {

            res.status(400).send(error.message);

        } 
    }
}