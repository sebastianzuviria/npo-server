'use-strict'

const { Activity } = require('../models/index');
const imageServices = require('../services/amazonS3/imageServices')

module.exports = {

    postActivity: async (req, res) => {

        const { content, name, userId } = req.body;
        
        try {
            const urlOfImage = await imageServices.uploadImage(req.file)

            await Activity.create({
                content,
                image:urlOfImage,
                name,
                userId
            });
            return res.status(200).json( { msg: 'Activity posted successfully' } ); // Improve response? 

        } catch (error) {
console.log(error.message);
            res.status(400).json(error.message);

        } 
    },

    updateActivity: async (req, res) => {

        
        console.log(req.body)
        console.log(req.file)
        
        const id = req.params.id;
        const { content, name, userId, urlImage } = req.body;
        const image =req.file
        
        try {
            const urlOfImage = async () => {
                if(image) {
                    console.log(urlImage);
                    const url = await imageServices.uploadImage(image)
                    await imageServices.deleteImage(urlImage)
                    return url
                } else {
                    return urlImage
                }
            }

            await Activity.update({
                content,
                image: await urlOfImage(),
                name ,
                userId
            }, { where: { id } } );

            // Get the updated activity
            const updatedActivity = await Activity.findByPk( id );

            return ( !updatedActivity ) ? res.status(400).json( { error: 'Activity not Found' } ) : res.status(200).json( updatedActivity );

        } catch (error) {

            console.log(error.message)
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
            const activityToDelete = await Activity.findByPk(id)
            if (activityToDelete) {
                await Activity.destroy({ where: { id } });
                await imageServices.deleteImage(activityToDelete.image)
                res.status(200).json({ msg: 'Activity deleted successfuly' })
            }else{
                res.status(400).json({ error: 'Activity not Found' });
            }

        } catch (error) {

            res.status(400).send(error.message);
        }
    }
}