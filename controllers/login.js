const { User, Role } = require('../models/index');
const verifyPassword = require('../utils/verifyPassword');
const { signToken } = require('../utils/jsonwebtoken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'image', 'firstName', 'lastName', 'email', 'password'],
      include: { model: Role, as: 'role', attributes: ['name'] }
    });
    if (!user)
      return res.status(404).json({ ok: false, msg: 'Email not found' });

    const passIsOk = await verifyPassword(password, user.password);

    if (!passIsOk) {
      return res.status(400).json({ ok: false, msg: "Password doesn't match" });
    } else {
      const {
        id,
        roleId,
        image,
        firstName,
        lastName,
        email,
        role: { name }
      } = user.dataValues;

      signToken(
        {
          id,
          roleId,
          image,
          firstName,
          lastName,
          email,
          role: name
        },
        res
      );
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false, err });
  }
};
module.exports = login;
