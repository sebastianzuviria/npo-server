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

    }

}