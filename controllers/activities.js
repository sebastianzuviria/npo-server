'use-strict'

const { Activity } = require('../models/index');

module.exports = {

    postActivity: async (req, res) => {

        const { content, image, name, userId } = req.body;

        try {

            await Activity.create({
                content,
                image,
                name,
                userId
            });
            return res.status(200).json( { msg: 'Activity posted successfully' } ); // Improve response? 

        } catch (error) {

            res.status(400).json(error.message);

        } 
    },

    updateActivity: async (req, res) => {

        const id = req.params.id;
        const { content, image, name, userId } = req.body;

        try {

            await Activity.update({
                content,
                image,
                name ,
                userId
            }, { where: { id } } );

            // Get the updated activity
            const updatedActivity = await Activity.findByPk( id );

            return ( !updatedActivity ) ? res.status(400).json( { error: 'Activity not Found' } ) : res.status(200).json( updatedActivity );

        } catch (error) {

            res.status(400).json(error.message);

        } 
    },

    getActivities: async (req,res)=>{
        try{

            const activities = await Activity.findAll();
            return res.status(200).json(activities)
            
        }catch(error){
            
            res.status(400).json({error: error.message})

        }
    },

    getActivityById: async (req,res)=>{
        const id = req.params.id;
        try{

            const activity = await Activity.findByPk(id);
            

            if(!activity){
                return res.status(404).json({ error: 'Activity not Found'});
            }
            else {
                return res.status(200).json(activity);
            }
            
        }catch(error){
            
            res.status(400).json({status: 400, error: error.message})

        }
    },

    deleteActivity: async (req, res) => {

        const id = req.params.id;
    
        try {

            const deletedActivity = await Activity.destroy({ where: { id } });
            
            return ( deletedActivity ) 
                ? res.status(200).json({ msg: 'Activity deleted successfuly' }) 
                : res.status(400).json({ error: 'Activity not Found' });

        } catch (error) {

            res.status(400).send(error.message);
        }
    }
}