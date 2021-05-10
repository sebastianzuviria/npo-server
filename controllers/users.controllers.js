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

    },

    getUser: async (req,res)=>{
        try {

            const user = await User.findOne({where:{id:req.params.id}})
            if(!user){
                return res.status(404).json({ msg: 'User not Found'});
            }
            else{
                return res.status(200).json(user);
            }

        } catch (error) {

            res.status(400).json({status: 400, error: error.message})

        }
    }

}


