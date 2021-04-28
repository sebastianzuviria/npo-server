const getUser = require('../controllers/getUser');
const isEmail = require('../middlewares/isEmail');
const passwordLength = require('../middlewares/passwordLength');
const validateBody = require('../middlewares/validateBody');
const verifyPassword = require('../utils/verifyPassword');
//const loginUser = require('../utils/jsonwebtoken);

const router = require('express').Router();

router
  .route('/login')
  .post(isEmail, passwordLength, validateBody, async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await getUser('email', email);
      if (!user) res.status(404).json({ ok: false });

      const passIsOk = verifyPassword(password, user.password);
      if (!passIsOk) res.status(400).json({ ok: false });

      // JWT implementation
      // loginUser(user)

      res.status(200).json(user);
    } catch (err) {
      //console.log(err);
      res.status(500).json({ ok: false });
    }
  });

module.exports = router;
