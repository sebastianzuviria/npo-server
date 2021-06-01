const { decodeToken } = require('../utils/jsonwebtoken');
const { Role } = require('../models/index');

module.exports = {
  verifyAdmin: async (req, res, next) => {
    try {
      const token = decodeToken(req);
      if (!token)
        return res.status(401).json({ error: 'token invalid or missing' });
      const { roleId } = token;

      console.log(token);
      console.log(roleId);
      const isRole = await Role.findByPk(roleId, {
        attributes: ['name']
      });
      console.log(isRole);
      if (isRole.name !== 'Admin')
        return res.status(401).json({ msg: 'You are not authorized' });

      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
