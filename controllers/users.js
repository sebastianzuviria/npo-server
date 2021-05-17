'use-strict';

const { User, Role } = require('../models/index');
const bcrypt = require('bcrypt');
const { signToken, decodeToken } = require('../utils/jsonwebtoken');

const infoUser = async (req, res) => {
  try {
    const token = decodeToken(req );
    if (!token)
      return res.status(401).json({ error: 'token invalid or missing' });

    const { id } = token;
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
  const { email, firstName, image = null, lastName, roleId } = req.body;

  const userExists = await User.findOne({ where: { email: req.body.email } });

  try {
    if (!userExists) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = await User.create({
        firstName,
        image,
        lastName,
        email,
        password: hash,
        roleId
      });

      const { password, ...dataForToken } = newUser.dataValues;
      signToken(dataForToken, res);
    } else {
      res.status(409).json({
        message: 'User already registered'
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err
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
      attributes: ['firstName', 'lastName', 'roleId']
    });

    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  infoUser,
  registerUser,
  deleteUser,
  getUsers
};
