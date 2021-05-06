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
    },

    listActivity: async (req,res)=>{
        try{

            const activities = await Activity.findAll();
            return res.status(200).json(activities)
            
        }catch(error){
            
            res.status(400).json({status: 400, error: error.message})

        }
    },

    oneActivity: async (req,res)=>{
        try{

            const activity = await Activity.findAll({where:{id:req.params.id}});
            

            if(activity.length === 0){
                return res.status(404).json({ msg: 'Activity not Found'});
            }
            else{
                return res.status(200).json(activity);
            }
            
        }catch(error){
            
            res.status(400).json({status: 400, error: error.message})

        }
    }
}