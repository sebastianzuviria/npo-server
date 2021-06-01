'use-strict';

const { User, Role } = require('../models/index');
const {
  uploadImage,
  deleteImage
} = require('../services/amazonS3/imageServices');
const encryptPassword = require('../utils/encrypt');
const { signToken } = require('../utils/jsonwebtoken');

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
      await User.create({
        firstName,
        lastName,
        email,
        password: hash
      });
      const createdUser = await User.findOne({
        where: { email },
        attributes: [
          'id',
          'image',
          'firstName',
          'lastName',
          'email',
          'password',
          'roleId'
        ],
        include: { model: Role, as: 'role', attributes: ['name'] }
      });

      const {
        password,
        role: { name },
        ...dataForToken
      } = createdUser.dataValues;

      signToken({ ...dataForToken, name }, res);
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
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'user not found' });

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
    console.log(userList);

    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    // Esto funciona solamente si se usa el middleware userIsLogged
    const { id } = req.user;
    const dataToUpdate = Object.keys(req.body).reduce((prev, value) => {
      if (req.body[value].length > 0) {
        prev[value] = req.body[value];
        return prev;
      }
    }, {});

    const userUpdated = await User.update(
      { ...dataToUpdate },
      { where: { id } }
    );

    if (!userUpdated)
      return res.status(404).json({ message: 'User not found' });

    const attributes = Object.keys(req.body).filter(
      (value) => req.body[value].length > 0
    );
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

const updateImage = async (req, res) => {
  try {
    // Esto funciona solamente si se usa el middleware userIsLogged
    const { id } = req.user;

    const { file } = req;
    if (file === undefined)
      return res.status(400).json({ message: 'send a image file' });

    const { dataValues } = await User.findByPk(id, { attributes: ['image'] });
    const { image } = dataValues;

    const imageUrl = await uploadImage(file);
    if (image) {
      await deleteImage(image);
    }
    const updatedUrl = await User.update(
      { image: imageUrl },
      { where: { id } }
    );
    if (updatedUrl) {
      res.status(200).json({ image: imageUrl });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  infoUser,
  registerUser,
  deleteUser,
  getUsers,
  updateProfile,
  updateRoleId,
  updateImage
};
