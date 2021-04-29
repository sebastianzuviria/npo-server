const {Role, User} = require('../models/index');

module.exports = {

    getUsers: async (req, res) => {

        try{
            
            const userList = await User.findAll({
                include: [{
                    model: Role,
                    as: 'role'
                }],
                attributes:['id', 'firstName', 'lastName', 'email', 'image' ]
                
            })
            
            if(userList.length === 0) throw new Error('The resources do not exist')
            res.status(200).json(userList)
    
        }catch(error){

            res.status(400).json({status: 400, error: error.message})

        }

    }

}


