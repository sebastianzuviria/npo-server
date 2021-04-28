// const {getDecodedToken} = require('') 
module.exports = {

    
    verifyAdmin: async (req, res, next) => {
        
        const {roleId} = req.body
        
        try{
            const {roleId} = await getDecodedToken(req);
            const isRole = await users.findByPk(roleId,{

                attributes:['id']

            })

            if (roleId !== isRole) throw new Error('Not authorized')
            next()
            
        }catch(error){
            // return next({status: 403, error: error.message}) (manejos de errores consultar)
            res.status(403).json({status: 403, error: error.message})
        }
        
    }
    

}