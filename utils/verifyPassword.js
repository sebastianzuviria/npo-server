const bcrypt = require('bcrypt');

const verifyPassword = (pass, hashedPass) => {
  const isValid = bcrypt.compareSync(pass, hashedPass);
  return isValid;
};

module.exports = verifyPassword;
