const { Contact } = require('../models/index');

const listContact = async (req, res) => {
  try {
    const contacts = await Contact.findAll();

    return res.status(200).json(contacts)


  } catch (err) {
    res.status(500).json({ ok: false, err });
  }
};

module.exports = {listContact};
