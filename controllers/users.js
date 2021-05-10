'use-strict';

const { User, Role } = require('../models/index');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/jsonwebtoken');

const infoUser = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: ['firstName', 'lastName', 'email'],
      where: {
        id: req.params.id
      }
    });

    if (!user) {
      res.status(404).json({ err: 'User not found' });
    } else {
      res.status(202).json(user);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const registerUser = async (req, res) => {
  const { email, firstName, lastName } = req.body;

  const userExists = await User.findOne({ where: { email: req.body.email } });

  try {
    if (!userExists) {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        const newUser = await User.create({
          firstName,
          lastName,
          email,
          password: hashedPassword
        });

        const { password, ...dataForToken } = newUser.dataValues;

        signToken(dataForToken, res);
      });
    } else {
      res.status(409).json({
        message: 'User already registered'
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Could not register user'
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.destroy({ where: { id } });
    return res.status(200).json({ message: 'User deleted successfuly' });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const userList = await User.findAll({
      include: [
        {
          model: Role,
          as: 'role'
        }
      ],
      attributes: ['id', 'firstName', 'lastName', 'email', 'image']
    });

    if (userList.length === 0) throw new Error('The resources do not exist');
    res.status(200).json(userList);
  } catch (error) {
    res.status(400).json({ status: 400, error: error.message });
  }
};

module.exports = {
  infoUser,
  registerUser,
  deleteUser,
  getUsers
};
