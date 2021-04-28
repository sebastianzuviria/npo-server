const { User } = require('../models/index');

const getUser = async (fieldname, value) => {
  try {
    const user = await User.findOne({ where: { [fieldname]: value } });
    return user ? user : false;
  } catch (err) {
    return err;
  }
};
module.exports = getUser;
