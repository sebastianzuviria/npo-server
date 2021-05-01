const { User } = require('../models/index');
const verifyPassword = require('../utils/verifyPassword');
const {loginUser} = require('../utils/jsonwebtoken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) res.status(404).json({ ok: false });

    const passIsOk = await verifyPassword(password, user.password);
    if (!passIsOk) res.status(400).json({ ok: false });

    // JWT implementation
    // loginUser(user)

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ ok: false });
  }
};
module.exports = login;
