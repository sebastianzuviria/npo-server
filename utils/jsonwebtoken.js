const jwt = require('jsonwebtoken');

const loginUser = (dataUser) => {
    const token = jwt.sign(
        dataUser.id, 
        process.env.SECRET,
    );

    return response.status(200).send({token, ...dataUser});
    
};

const decodeToken = (request) => {  
    const authorization = request.get('authorization');
           
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7);
        const decodedToken = jwt.verify(request.token, process.env.SECRET);
        if (request.token || decodedToken.id) {
            return decodedToken;  
        } else {
            return response.status(401).json({ error: 'token invalid' });
        }
    } else {
        return response.status(401).json({ error: 'token missing' });
    };
};

module.exports = {
    loginUser,
    decodeToken,
};