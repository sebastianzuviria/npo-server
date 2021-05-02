const { Contact } = require('../models/index');

const newContact = async (req, res) => {
  try {
    const { body } = req;
    const contact = await Contact.create({ ...body });

    if (!contact) res.status(400).json({ ok: false });

    res.status(201).json({ ok: true, msg: 'Contact created' });
  } catch (err) {
    res.status(500).json({ ok: false, err });
  }
};

module.exports = newContact;
