//const { Members } = require('../models/index')

module.exports = {

    createMembers: async (req, res) => {
        const {name, image} = req.body;
        try{

            if(!name) throw new Error('The name field is required');

            const hasCorrectFormat = /^([a-z]+[ ]?[a-z]+)+$/i;

            const isImage = /(.jpg|.jpeg|.png|.gif)$/i;
            
            if(!hasCorrectFormat.test(name)) throw new Error('Invalid format');
            if(!isImage.test(image)) throw new Error('The image field must be an image');
            
            //const response = await Members.create({name , image}); 

            res.status(201).json({name, image});

        }catch(error){

            res.status(400).json({status: 400, message: error.message})

        }
        
    }

}