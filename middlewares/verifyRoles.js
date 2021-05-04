const {decodeToken} = require('../utils/jsonwebtoken');
const { Role } = require('../models/index');

module.exports = {

    verifyAdmin: async (req, res, next) => {
        
        try{
            const { roleId } = decodeToken(req, res);
            
            const isRole = await Role.findByPk(roleId,{

                attributes:['name']

            })
            
            if (isRole.name !== "Admin") throw new Error('Not authorized')

            next()
            
        }catch(error){
            
            res.status(403).json({status: 403, error: error.message})
        }
        
    }
        
}