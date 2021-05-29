const updateProfileValidation = (req, res, next) => {
  const acceptedKeys = ['firstName', 'lastName'];
  const bodyKeys = Object.keys(req.body);

  const keysAreAccepted = bodyKeys.every((value) =>
    acceptedKeys.includes(value)
  );
  if (!keysAreAccepted) {
    return res
      .status(400)
      .json({ message: 'You can only edit firstName and lastName' });
  }

  const valuesAreAlpha = bodyKeys.every((value) =>
    req.body[value].match(/^[A-Za-z]+$/)
  );
  if (!valuesAreAlpha) {
    return res
      .status(400)
      .json({ message: 'Only alphabetic characters are accepted' });
  }

  next();
};

module.exports = updateProfileValidation;
