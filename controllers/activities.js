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
    },

    updateActivity: async (req, res) => {

        const id = req.params.id;
        const { content, image, name } = req.body;

        try {

            await Activity.update({
                content,
                image,
                name 
            }, { where: { id } } );

            // Get the updated activity
            const updatedActivity = await Activity.findByPk( id );

            return ( !updatedActivity ) ? res.status(400).send( { error: 'Activity does not exist' } ) : res.json( updatedActivity );

        } catch (error) {

            res.status(400).send(error.message);

        } 
    }
}