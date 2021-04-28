const bcrypt = require('bcrypt');
const saltRounds = 10; // Can be placed in an eviroment variable

// const encryptPassword = (password) => {
//     bcrypt.genSalt(saltRounds)
//     .then(salt => {
//         bcrypt.hash(password, salt)
//         .then(hashedPassword => {
//             return hashedPassword;
//         })
//         .catch(error => {
//             return error;
//         })
//     })
//     .catch(error => {
//         return error;
//     })
// }

module.exports = encryptPassword = async (password) => {
    let saltRounds = await bcrypt.genSalt(saltRounds);

    if (saltRounds) {
        let hashedPassword = await bcrypt.hash(password, saltRounds);

        if (hashedPassword) {
            return hashedPassword;
        }
        else {
            return 0;
        }
    }
    else {
        return 0;
    }
}