const {decodeToken} = require('../utils/jsonwebtoken');
const { User } = require('../models/index');

module.exports = {

    verifyAdmin: async (req, res, next) => {
        
        try{
            const { roleId, id } = decodeToken(req, res);
            
            const response = await User.findByPk(id,{

                attributes:['roleId']

            })
            console.log(response)
            const isRole = response.dataValues["roleId"];
            
            if (roleId !== isRole) throw new Error('Not authorized')

            next()
            
        }catch(error){
            
            res.status(403).json({status: 403, error: error.message})
        }
        
    }
        
}