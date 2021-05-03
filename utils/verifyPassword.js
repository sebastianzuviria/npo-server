const bcrypt = require('bcrypt');

const verifyPassword = async (pass, hashedPass) => {
  try {
    const isValid = await bcrypt.compare(pass, hashedPass);
    return isValid;
  } catch (err) {
    return err;
  }
};

module.exports = verifyPassword;
