'use-strict';

const { User, Role } = require('../models/index');
const encryptPassword = require('../utils/encrypt');
const { signToken, decodeToken } = require('../utils/jsonwebtoken');

const infoUser = async (req, res) => {
  try {
    // Esto funciona solamente si se usa el middleware userIsLogged
    const { id } = req.user;
    const user = await User.findOne({
      attributes: ['firstName', 'lastName', 'email', 'id', 'roleId'],
      where: {
        id
      }
    });

    if (!user) return res.status(404).json({ err: 'User not found' });

    return res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    const userExists = await User.findOne({ where: { email } });

    if (!userExists) {
      const hash = await encryptPassword(req.body.password);
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hash
      });

      const { password, ...dataForToken } = newUser.dataValues;
      signToken(dataForToken, res);
    } else {
      res.status(409).json({
        message: 'User already registered'
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

const deleteUser = async (req, res) => {
  const token = decodeToken(req);
  if (!token)
    return res.status(401).json({ error: 'token invalid or missing' });
  const { id } = token;
  try {
    await User.destroy({ where: { id } });
    return res.status(200).json({ message: 'User deleted successfuly' });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const userList = await User.findAll({
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['name']
        }
      ],
      attributes: ['firstName', 'lastName', 'roleId', 'id']
    });

    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    // Esto funciona solamente si se usa el middleware userIsLogged
    const { id } = req.user;
    const userUpdated = await User.update({ ...req.body }, { where: { id } });

    if (!userUpdated)
      return res.status(404).json({ message: 'User not found' });

    const attributes = Object.keys(req.body);
    const { dataValues: updatedData } = await User.findByPk(id, {
      attributes
    });
    return res.status(200).json(updatedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateRoleId = async (req, res) => {
  try {
    const { roleId } = req.body;
    const { id } = req.params;

    const updated = await User.update({ roleId }, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({ ok: true, message: 'RoleId updated!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  infoUser,
  registerUser,
  deleteUser,
  getUsers,
  updateProfile,
  updateRoleId
};
