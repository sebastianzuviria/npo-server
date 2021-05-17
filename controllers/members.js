const { Members } = require('../models/index');

module.exports = {

    getMembers: async (req, res) => {

        try{

            const memberList = await Members.findAll({
                
                attributes:['id', 'name', 'image']
                
            })
            
            res.status(200).json(memberList);

        }catch(error){

            res.status(400).json({status: 400, error: error.message})

        }

    },

    createMembers: async (req, res) => {
        const {name, image} = req.body;
        try{

            if(!name) throw new Error('The name field is required');

            const hasCorrectFormat = /^([a-z]+[ ]?[a-z]+)+$/i;

            const isImage = /(.jpg|.jpeg|.png|.gif)$/i;
            
            if(!hasCorrectFormat.test(name)) throw new Error('Invalid format');
            if(!isImage.test(image)) throw new Error('The image field must be an image');
            
            const response = await Members.create({name , image}); 

            res.status(201).json(response);

        }catch(error){

            res.status(400).json({status: 400, message: error.message})

        }
        
    },

    deleteMember: async (req, res) => {
        const id = req.params.id;
    
        try {
            
            const response = await Members.destroy({
                 where: { id: id }
            })
            
            if(response !== 1) return res.status(400).json({ error: 'Member not found' });

            res.status(200).json({ message: 'Member deleted' });

        
        } catch (err) {
            res.status(500).json({ err: err.message });
        };
    },

    updateMember: async (req, res)=>{

        const id = req.params.id;
        const {name, image}= req.body;

        
        try {
            const member = await Members.findByPk( id );

            if(member){

                const memberUpdate= await member.update({
                    name,
                    image 
                }, { where: { id } } );

                return res.status(200).json(memberUpdate);

            }
            else{
                return res.status(404).json( { message: 'Member not Found' } );
            }

        }
        catch(err){
            res.status(500).json({ err: err.message });
        }

    }
    

}
    

    


