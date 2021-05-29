const { decodeToken } = require('../utils/jsonwebtoken');

const userIsLogged = (req, res, next) => {
  const token = decodeToken(req);
  if (!token)
    return res.status(401).json({ error: 'token invalid or missing' });
  req.user = { ...token };
  next();
};

module.exports = userIsLogged;
