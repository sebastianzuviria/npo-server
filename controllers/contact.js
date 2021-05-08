const { Contact } = require('../models/index');
const { sendEmailContactThanks } = require('../services/email/email.ready');

const newContact = async (req, res) => {
  try {
    const { body } = req;
    const contact = await Contact.create({ ...body });

    if (!contact) res.status(400).json({ ok: false });

    await sendEmailContactThanks({...body})
    
    res.status(201).json({ ok: true, msg: 'Contact created' });
  } catch (err) {
    res.status(500).json({ ok: false, err });
  }
};

const getContacts = async (req, res) => {
  try {
    let contactsList = await Contact.findAll();
  
    if (contactsList.length === 0) {
      res.status(404).json({
        'message': 'Sorry, there are no contacts'
      })
    }
    else {
      res.status(200).json({
        'contacts': contactsList
      })
    }
  } 
  catch (error) {
    res.status(500).json({
      'message': 'Contacts not found',
      'error': error.message
    })
  }
}

module.exports = { newContact, getContacts };