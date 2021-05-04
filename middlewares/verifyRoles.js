const {decodeToken} = require('../utils/jsonwebtoken');
const { User } = require('../models/index');

module.exports = {

    verifyAdmin: async (req, res, next) => {
        
        try{
            const { roleId } = decodeToken(req, res);
            
            const response = await User.findByPk(roleId,{

                attributes:['roleId']

            })

            const isRole = response.dataValues["roleId"].toString();
            console.log(isRole)
            if (roleId !== isRole) throw new Error('Not authorized')

            next()
            
        }catch(error){
            // return next({status: 403, error: error.message}) (manejos de errores consultar)
            res.status(403).json({status: 403, error: error.message})
        }
        
    }
        
}