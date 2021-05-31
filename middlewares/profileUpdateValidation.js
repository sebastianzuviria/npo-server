const valuesAreAlpha = (req, res, next) => {
  try {
    const bodyKeys = Object.keys(req.body);
    const valuesAreAlpha = bodyKeys.every((value) => {
      if (value === 'email') return true;
      console.log(value);
      return req.body[value].match(/^[A-Za-z]+$/);
    });
    console.log(valuesAreAlpha);

    if (!valuesAreAlpha) {
      return res
        .status(400)
        .json({ message: 'Only alphabetic characters are accepted' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const keysAreAccepted = (req, res, next) => {
  try {
    const acceptedKeys = ['firstName', 'lastName', 'email'];
    const bodyKeys = Object.keys(req.body);

    const keysAreAccepted = bodyKeys.every((value) =>
      acceptedKeys.includes(value)
    );
    if (!keysAreAccepted) {
      return res
        .status(400)
        .json({ message: `You can only edit ${acceptedKeys.join(', ')}` });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.mesage });
  }
};

const validEmail = (req, res, next) => {
  try {
    if (!req.body.email) return next();

    const isValid = req.body.email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    if (!isValid) return res.status(400).json({ message: 'Invalid email' });

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { keysAreAccepted, valuesAreAlpha, validEmail };
