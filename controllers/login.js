const { User } = require('../models/index');
const verifyPassword = require('../utils/verifyPassword');
const { signToken } = require('../utils/jsonwebtoken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ ok: false, msg: 'Email not found' });

    const passIsOk = await verifyPassword(password, user.password);

    if (!passIsOk) {
      return res.status(400).json({ ok: false, msg: "Password doesn't match" });
    } else {
      const { password, ...dataForToken } = user.dataValues;
      signToken(dataForToken, res);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false, err });
  }
};
module.exports = login;
