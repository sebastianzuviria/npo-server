const jwt = require('jsonwebtoken')
const { modelName } = require('../../../alkemylabsjs/balance-api/models/operation')

const loginUser = (dataUser) => {
    const token = jwt.sign(
        dataUser.id, 
        process.env.SECRET 
    )

    return (
        response
            .status(200)
            .send({token, ...dataUser})
    )
}

module.exports = {
    loginUser
}